// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies, type CookieOptions } from "next/headers";

/**
 * Helper SSR para Next 15 (Route Handlers en runtime node).
 * cookies() es ASYNC, por eso este helper es async.
 * Exportamos dos alias para evitar errores de import en otros archivos.
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
        // usar siempre la sobrecarga (name, value, options)
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

// Alias para código que importe el nombre anterior:
export const createSupabaseServer = getSupabaseServerClient;
