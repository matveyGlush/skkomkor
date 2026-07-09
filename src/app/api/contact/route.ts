import { NextResponse } from "next/server";

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

  console.log("Contact form submission:", body);

  return NextResponse.json({ ok: true });
}
