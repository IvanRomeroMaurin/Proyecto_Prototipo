// src/app/api/auth/resend/route.ts
import { NextResponse } from "next/server";
// importa y usa tu SDK de Resend como corresponda

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ...
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 500 });
  }
}
