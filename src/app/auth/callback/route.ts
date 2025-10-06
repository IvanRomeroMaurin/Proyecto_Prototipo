// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies, type CookieOptions } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(req: Request) {
  // 👇 AHORA ES ASÍ
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
          // En Next 15 podés usar la sobrecarga name, value, options
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions = {}) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // … tu lógica (ej: leer query params, intercambiar el código, etc.)

  return NextResponse.redirect(new URL("/", req.url));
}
