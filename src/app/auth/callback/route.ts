// src/app/auth/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const runtime = "nodejs";           // <— importante en Vercel
export const dynamic = "force-dynamic";    // evita caché en este paso

function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // (publishable/anon)
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
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
    const supabase = createServerSupabase();

    // Con email-confirmation/magic link se usa verifyOtp con token_hash
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    // Si no hubo error, ya quedó seteada la sesión en cookies HttpOnly
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  // Si algo falla, te mando a /auth/login con un mensajito
  const to = new URL("/auth/login?error=confirm", url.origin);
  return NextResponse.redirect(to);
}
