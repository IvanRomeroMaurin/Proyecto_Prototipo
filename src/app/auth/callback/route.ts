// app/auth/callback/route.ts (o src/app/... si usás /src)
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(req: Request) {
  // cookies() puede ser objeto o Promise en algunos tipos/builds → normalizamos
  const storeMaybe = cookies() as unknown;

  const cookieStore: {
    get: (name: string) => { value: string } | undefined;
    set: (name: string, value: string, options?: CookieOptions) => void;
  } =
    typeof (storeMaybe as any)?.then === "function"
      ? await (storeMaybe as Promise<any>)
      : (storeMaybe as any);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) =>
          cookieStore.set(name, value, options as any),
        remove: (name: string, options: CookieOptions) =>
          cookieStore.set(name, "", { ...(options as any), maxAge: 0 }),
      },
    }
  );

  // Intercambia ?code= por sesión y escribe las cookies
  await supabase.auth.exchangeCodeForSession(req.url);

  // Redirigí a donde quieras
  const redirectTo = new URL("/", new URL(req.url).origin);
  return NextResponse.redirect(redirectTo);
}
