// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies, type CookieOptions } from "next/headers";

/**
 * Devuelve un cliente de Supabase ya configurado para SSR (Next 15).
 * IMPORTANTE: cookies() es async en Route Handlers, por eso este helper es async.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
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
}
