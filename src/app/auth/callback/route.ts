import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function createServerSupabase() {
  const cookieStore = await cookies();

  // Aseguramos "path=/" para que las cookies sean visibles en toda la app
  const normalize = (opts?: CookieOptions): CookieOptions => ({
    ...opts,
    path: opts?.path ?? "/",
  });

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, normalize(options));
        },
        remove(name: string, options: CookieOptions) {
          // Sin usar delete ni ts-comments; invalidamos por expiración inmediata
          cookieStore.set(name, "", normalize({ ...options, maxAge: 0 }));
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
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/login?error=confirm", url.origin));
}
