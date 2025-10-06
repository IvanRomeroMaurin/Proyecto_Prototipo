// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) =>
          cookieStore.set({ name, value, ...options }),
        remove: (name: string, options: CookieOptions) =>
          cookieStore.set({ name, value: "", ...options }),
      },
    }
  );

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // 👇 MUY IMPORTANTE: intercambia el code por una sesión en tu dominio
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // si hay error, igual te conviene redirigir a login con mensaje
    if (error) {
      return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, req.url));
    }
  }

  // Redirigí a la cuenta o al home
  return NextResponse.redirect(new URL("/cuenta", req.url));
}
