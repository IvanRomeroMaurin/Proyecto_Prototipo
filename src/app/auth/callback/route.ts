// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies, type CookieOptions } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs"; // si usás edge, ajustalo, pero nodejs está bien

export async function GET(req: Request) {
  // cookies() ES ASYNC en Route Handlers (Next 15 runtime node)
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

  // Si necesitás leer el code que llega en la URL:
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (code) {
    // Tu lógica si hicieras intercambio manual (normalmente Supabase ya setea sesión con el callback url).
  }

  // Donde quieras redirigir después del callback:
  return NextResponse.redirect(new URL("/", req.url));
}
