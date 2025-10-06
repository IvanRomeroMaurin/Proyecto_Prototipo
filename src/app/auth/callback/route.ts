// src/app/auth/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const runtime = "nodejs";          // Forzamos Node.js en Vercel (no edge)
export const dynamic = "force-dynamic";   // Sin caché en este handler

async function createServerSupabase() {
  // En Next 15, cookies() puede ser sync o async según el runtime.
  // "await" funciona en ambos casos (si es sync, devuelve el valor; si es async, resuelve la Promise).
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // publishable/anon key
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // En Next 15 el set recomendado es set(name, value, options)
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          // Algunos entornos exponen delete; si no, invalidamos por maxAge=0
          // @ts-expect-error - delete puede no estar tipado en algunas versiones
          if (typeof cookieStore.delete === "function") {
            // @ts-ignore
            cookieStore.delete(name);
          } else {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          }
        },
      },
    }
  );
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = (url.searchParams.get("type") ?? "email") as
    | "email"
    | "recovery"
    | "invite"
    | "magiclink";

  const next = url.searchParams.get("next") ?? "/";

  if (token_hash) {
    const supabase = await createServerSupabase();

    // Verifica el token y, si todo ok, Supabase setea la sesión en cookies HttpOnly
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  // Fallback si algo falla
  return NextResponse.redirect(new URL("/auth/login?error=confirm", url.origin));
}
