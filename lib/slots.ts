// Shared booking-slot constants. Pure (no server-only deps) so this file is
// safe to import from both the client booking UI and server route handlers.

export const TIME_SLOTS = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

// Each appointment occupies this many minutes for availability/blocking.
// Slots are spaced 2 hours apart, so a 120-min block prevents overlap.
export const SLOT_DURATION_MIN = 120;

// Studio is in the Bay Area.
export const TIME_ZONE = "America/Los_Angeles";

// "10:00 AM" -> { hour: 10, minute: 0 } (24h)
export function parseSlot(slot: string): { hour: number; minute: number } {
  const [time, ap] = slot.split(" ");
  let [hour] = time.split(":").map(Number);
  const minute = Number(time.split(":")[1]);
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

// Returns the UTC instant for a wall-clock time on `isoDate` (YYYY-MM-DD) in
// `timeZone`, correctly accounting for DST. Works in Node and the browser.
export function zonedDateTime(
  isoDate: string,
  hour: number,
  minute: number,
  timeZone = TIME_ZONE
): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  const desiredUTC = Date.UTC(y, m - 1, d, hour, minute);

  // What wall-clock time does `desiredUTC` correspond to in `timeZone`?
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric",
    hour12: false,
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(new Date(desiredUTC)).map((p) => [p.type, p.value])
  );
  const asWallUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour === "24" ? "0" : parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  // The offset is the difference; subtract it to get the true instant.
  const offset = asWallUTC - desiredUTC;
  return new Date(desiredUTC - offset);
}
