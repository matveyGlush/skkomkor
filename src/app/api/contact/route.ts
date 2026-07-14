import { NextResponse } from "next/server";

const CONTACT_API_URL = process.env.CONTACT_API_URL;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.contact !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.contact.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  if (!CONTACT_API_URL) {
    console.error("CONTACT_API_URL is not configured; contact submission dropped:", body);
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Contact API responded with an error:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to reach contact API:", error);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
