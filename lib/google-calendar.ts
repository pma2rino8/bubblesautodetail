import "server-only";
import { google } from "googleapis";
import {
  TIME_SLOTS,
  SLOT_DURATION_MIN,
  TIME_ZONE,
  parseSlot,
  zonedDateTime,
} from "./slots";

export type BookingDetails = {
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  notes?: string;
};

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

/** True when the service-account credentials are configured. */
export function calendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY
  );
}

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    // Private keys stored in env have literal "\n"; convert to real newlines.
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

function slotRange(isoDate: string, slot: string) {
  const { hour, minute } = parseSlot(slot);
  const start = zonedDateTime(isoDate, hour, minute);
  const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60_000);
  return { start, end };
}

/**
 * Returns the subset of TIME_SLOTS that are free on `isoDate`, based on the
 * calendar's busy intervals. If credentials are missing, returns all slots.
 */
export async function getAvailableSlots(isoDate: string): Promise<string[]> {
  if (!calendarConfigured()) return [...TIME_SLOTS];

  const calendar = getCalendarClient();

  // Query the whole working window once.
  const dayStart = zonedDateTime(isoDate, 0, 0);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000);

  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: TIME_ZONE,
      items: [{ id: CALENDAR_ID }],
    },
  });

  const busy = fb.data.calendars?.[CALENDAR_ID]?.busy ?? [];
  const busyRanges = busy.map((b) => ({
    start: new Date(b.start!).getTime(),
    end: new Date(b.end!).getTime(),
  }));

  return TIME_SLOTS.filter((slot) => {
    const { start, end } = slotRange(isoDate, slot);
    const s = start.getTime();
    const e = end.getTime();
    const overlaps = busyRanges.some((r) => s < r.end && e > r.start);
    return !overlaps;
  });
}

/** True if `slot` on `isoDate` is currently free. */
export async function isSlotAvailable(isoDate: string, slot: string) {
  const available = await getAvailableSlots(isoDate);
  return available.includes(slot);
}

/** Creates the calendar event for a booking. Returns the event's htmlLink. */
export async function createBookingEvent(b: BookingDetails): Promise<string> {
  const calendar = getCalendarClient();
  const { start, end } = slotRange(b.date!, b.time!);

  const vehicle = [b.year, b.make, b.model].filter(Boolean).join(" ");
  const summary = `Detail — ${b.name || "Booking"}${vehicle ? ` (${vehicle})` : ""}`;

  const description = [
    b.service && `Service: ${b.service}`,
    vehicle && `Vehicle: ${vehicle}${b.color ? ` — ${b.color}` : ""}`,
    b.name && `Name: ${b.name}`,
    b.email && `Email: ${b.email}`,
    b.phone && `Phone: ${b.phone}`,
    b.notes && `Notes: ${b.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary,
      description,
      start: { dateTime: start.toISOString(), timeZone: TIME_ZONE },
      end: { dateTime: end.toISOString(), timeZone: TIME_ZONE },
    },
  });

  return res.data.htmlLink ?? "";
}
