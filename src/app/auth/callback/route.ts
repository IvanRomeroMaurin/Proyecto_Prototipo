// app/auth/callback/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// ✅ Adaptador de cookies compatible con Next 15 y Supabase
function createSupabaseServer() {
  const cookieStore = cookies(); // tipado readonly

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            const c = (
              cookieStore as unknown as {
                get: (n: string) => { value: string } | undefined;
              }
            ).get(name);
            return c?.value;
          } catch {
            return undefined;
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            (
              cookieStore as unknown as {
                set: (n: string, v: string, o?: CookieOptions) => void;
              }
            ).set(name, value, options);
          } catch {
            /* no-op en runtimes que no permitan mutar */
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            (
              cookieStore as unknown as {
                set: (n: string, v: string, o?: CookieOptions) => void;
              }
            ).set(name, "", { ...options, maxAge: 0 });
          } catch {
            /* no-op */
          }
        },
      },
    }
  );
}

export async function GET(req: Request) {
  const supabase = createSupabaseServer();

  // 🔄 Intercambia el ?code= por sesión y escribe cookies
  await supabase.auth.exchangeCodeForSession(req.url);

  // 🔁 Redirige al home (podés cambiar "/" por "/cuenta" o lo que quieras)
  const redirectTo = new URL("/", new URL(req.url).origin);
  return NextResponse.redirect(redirectTo);
}
