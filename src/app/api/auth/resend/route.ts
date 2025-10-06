// src/app/api/auth/resend/route.ts
import { NextResponse } from "next/server";
// imports de Resend...

export async function POST(req: Request) {
  try {
    // tu lógica de envío
    return NextResponse.json({ ok: true });
  } catch {
    // sin (e) para evitar @typescript-eslint/no-unused-vars
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 500 });
  }
}
