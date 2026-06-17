import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "peter@bubblesautodetail.com";
// Until bubblesautodetail.com is verified in Resend, this must be Resend's
// shared sender (onboarding@resend.dev). Swap to a verified address once set up.
const FROM = process.env.BOOKING_FROM_EMAIL || "Bubbles Booking <onboarding@resend.dev>";

type BookingForm = {
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

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY." },
      { status: 500 }
    );
  }

  let form: BookingForm;
  try {
    form = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!form.name || !form.email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const rows: [string, string][] = [
    ["Vehicle", [form.year, form.make, form.model].filter(Boolean).join(" ") + (form.color ? ` — ${form.color}` : "")],
    ["Service", form.service || "—"],
    ["Name", form.name],
    ["Email", form.email],
    ["Phone", form.phone || "—"],
    ["Preferred Date", form.date || "—"],
    ["Preferred Time", form.time || "—"],
    ["Notes", form.notes || "—"],
  ];

  const html = `
    <h2 style="font-family:sans-serif;">New booking request</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#888;vertical-align:top;">${esc(k)}</td><td style="padding:6px 0;">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: form.email,
    subject: `New booking — ${form.name}${form.service ? ` (${form.service.split(" — ")[0]})` : ""}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
