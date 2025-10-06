// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies, type CookieOptions } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(req: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? "";
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions = {}) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // Ejemplo: si intercambiás un "code" de Supabase que viene en la URL
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (code) {
    // Normalmente Supabase maneja el seteo de la sesión con el callback URL
    // (si usás el enlace de confirmación de email de Supabase).
    // De no usarlo, harías aquí el intercambio según tu flujo.
  }

  // Redirigí a donde corresponda luego del callback
  return NextResponse.redirect(new URL("/", req.url));
}
