import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

// Availability depends on live calendar state — never cache.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "A valid date (YYYY-MM-DD) is required." },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ date, slots });
  } catch (err) {
    console.error("Availability lookup failed:", err);
    return NextResponse.json(
      { error: "Could not load availability." },
      { status: 502 }
    );
  }
}
