// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies, type CookieOptions } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs"; // si usas edge, cambia a "edge"

export async function GET(req: Request) {
  // 👇 en Route Handlers de Next 15 hay que await
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? "";
        },
        // 👇 usa la sobrecarga (name, value, options) — NO el objeto
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions = {}) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // Si usas el code de supabase en la URL:
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (code) {
    // normal/mente supabase maneja el seteo de sesión via callback URL
  }

  return NextResponse.redirect(new URL("/", req.url));
}
