// app/auth/callback/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(req: Request) {
  // En algunas versiones/types, cookies() viene como Promise<ReadonlyRequestCookies>
  const maybePromise = cookies() as unknown as
    | Promise<{ get: (n: string) => { value: string } | undefined; set: (...a: any[]) => void }>
    | { get: (n: string) => { value: string } | undefined; set: (...a: any[]) => void };

  // Normalizamos a un store usable (con .get/.set)
  const cookieStore =
    typeof (maybePromise as any).then === "function"
      ? await (maybePromise as Promise<any>)
      : (maybePromise as any);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore.get(name)?.value as string | undefined;
          } catch {
            return undefined;
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Next 15 acepta (name, value, options)
            cookieStore.set(name, value, options as any);
          } catch {
            /* no-op */
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, "", { ...(options as any), maxAge: 0 });
          } catch {
            /* no-op */
          }
        },
      },
    }
  );

  // Intercambia ?code= por sesión y escribe cookies
  await supabase.auth.exchangeCodeForSession(req.url);

  // Redirige a donde prefieras
  const redirectTo = new URL("/", new URL(req.url).origin);
  return NextResponse.redirect(redirectTo);
}
