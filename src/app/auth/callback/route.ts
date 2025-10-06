// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies, type CookieOptions } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs"; // o "edge" si así lo necesitas

// 👇 tiene que ser async
export async function GET(req: Request) {
  // 👇 cookies() es async en Next 15 (Route Handlers)
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? "";
        },
        // 👇 usá esta sobrecarga (name, value, options)
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions = {}) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // tu lógica (si lees ?code=... de Supabase, etc.)
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (code) {
    // si tu flujo necesita algo acá, dejalo
  }

  return NextResponse.redirect(new URL("/", req.url));
}
