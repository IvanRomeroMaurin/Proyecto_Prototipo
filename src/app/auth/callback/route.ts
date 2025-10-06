// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // En Route Handlers de Next 15, cookies() es async
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Forma recomendada por Supabase (objeto)
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Usarlo para evitar warning (o redirigí en base a user)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectTo = user ? "/cuenta" : "/";
  return NextResponse.redirect(new URL(redirectTo, req.url));
}
