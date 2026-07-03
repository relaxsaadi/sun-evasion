import { NextRequest, NextResponse } from "next/server";

async function makeToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode("sun-evasion-admin"));
  return Buffer.from(sig).toString("hex");
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD non configuré dans les variables d'environnement Vercel." },
      { status: 500 }
    );
  }

  if (!password || password !== expected) {
    // Fixed-time comparison to prevent timing attacks
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await makeToken(expected);
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
  return res;
}
