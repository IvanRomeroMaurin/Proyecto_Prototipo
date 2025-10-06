"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/colecciones", label: "Colecciones" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/contact", label: "Contacto" },
];

type MinimalUser = Pick<User, "id" | "email" | "user_metadata"> | null;

export default function NavbarClient({ initialUser }: { initialUser: MinimalUser }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<MinimalUser>(initialUser);
  const [loadingUser, setLoadingUser] = useState(!initialUser);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    // Si no vino user desde el server, lo buscamos una sola vez
    (async () => {
      if (initialUser) return;
      setLoadingUser(true);
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      const u = data.user
        ? { id: data.user.id, email: data.user.email, user_metadata: data.user.user_metadata }
        : null;
      setUser(u);
      setLoadingUser(false);
    })();

    // Suscripción a cambios de auth (login/logout/refresh)
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user
        ? { id: session.user.id, email: session.user.email, user_metadata: session.user.user_metadata }
        : null;
      setUser(u);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [initialUser]);

  const initials = useMemo(() => {
    const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
    const nombre = (meta["nombre"] as string | undefined)?.[0]?.toUpperCase() ?? "";
    const apellido = (meta["apellido"] as string | undefined)?.[0]?.toUpperCase() ?? "";
    return `${nombre}${apellido}` || (user?.email?.[0]?.toUpperCase() ?? "?");
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/70 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="group inline-flex items-center gap-2">
          <div
            aria-hidden
            className="h-7 w-7 rounded-lg ring-1 ring-emerald-400/20"
            style={{
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.35), rgba(16,185,129,0.15), transparent)",
            }}
          />
          <span className="text-base font-semibold tracking-wide text-white">Le Parfum</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`text-sm font-medium transition ${
                pathname === i.href ? "text-emerald-300" : "text-neutral-300 hover:text-white"
              }`}
            >
              {i.label}
            </Link>
          ))}

          {/* Search */}
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar perfumes…"
              className="w-56 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-500">
              ⌘K
            </span>
          </div>

          {/* Cart */}
          <Link
            href="/carrito"
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm font-semibold text-neutral-200 transition hover:border-emerald-600/40 hover:bg-neutral-900/70"
          >
            Carrito
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-neutral-950">
              0
            </span>
          </Link>

          {/* Auth */}
          {loadingUser ? (
            <div className="h-9 w-32 animate-pulse rounded-xl bg-neutral-800/60" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/cuenta"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 hover:text-white"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/25 text-xs text-emerald-200">
                  {initials}
                </span>
                Mi cuenta
              </Link>

              {/* Logout en el servidor para borrar cookie HttpOnly */}
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm font-semibold text-neutral-300 transition hover:border-red-500/40 hover:bg-neutral-900 hover:text-red-300"
                >
                  Salir
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="rounded-xl border border-emerald-600/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/30 hover:text-white"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl border border-emerald-600/20 bg-transparent px-4 py-2 text-sm font-semibold text-neutral-300 transition hover:border-emerald-600/40 hover:text-emerald-300"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-300 hover:bg-neutral-900 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile panel (idéntico a tu versión, solo cambia el logout) */}
      {open && (
        <div className="border-t border-neutral-800/70 bg-neutral-950/95 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex flex-col gap-2">
              <input
                type="search"
                placeholder="Buscar perfumes…"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {navItems.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                    pathname === i.href
                      ? "bg-neutral-900/70 text-emerald-300"
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/carrito"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900"
              >
                Carrito (0)
              </Link>

              {/* Auth (mobile) */}
              {loadingUser ? (
                <div className="h-9 w-full animate-pulse rounded-lg bg-neutral-800/60" />
              ) : user ? (
                <>
                  <Link
                    href="/cuenta"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/10"
                  >
                    Mi cuenta
                  </Link>
                  <form action="/auth/logout" method="post" onSubmit={() => setOpen(false)}>
                    <button
                      type="submit"
                      className="w-full rounded-lg px-2 py-2 text-sm font-semibold text-red-300 hover:bg-red-600/10 text-left"
                    >
                      Salir
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/10"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-semibold text-neutral-300 hover:bg-emerald-600/10 hover:text-emerald-300"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
