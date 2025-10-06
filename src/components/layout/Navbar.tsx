"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, type User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-800">
      <Link href="/" className="text-lg font-semibold">Le Parfum</Link>
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link href="/auth/login" className="hover:text-gray-400">Iniciar sesión</Link>
            <Link href="/auth/register" className="hover:text-gray-400">Registrarse</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300">
              Hola, {user.user_metadata?.nombre || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
