// app/auth/callback/route.ts  (o src/app/auth/callback/route.ts)
export const runtime = "nodejs"; // cookies mutables

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Helper inlined para evitar errores de import
function createSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

export async function GET(req: Request) {
  const supabase = createSupabaseServer();
  // Intercambia ?code=... por sesión y escribe cookies
  await supabase.auth.exchangeCodeForSession(req.url);

  // Redirige al home
  const redirectTo = new URL("/", new URL(req.url).origin);
  return NextResponse.redirect(redirectTo, { status: 302 });
}
