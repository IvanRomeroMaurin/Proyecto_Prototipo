// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/colecciones", label: "Colecciones" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          <span className="text-base font-semibold tracking-wide text-white">
            Le Parfum
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href
                  ? "text-emerald-300"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {item.label}
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
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-300 hover:bg-neutral-900 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-neutral-800/70 bg-neutral-950/95 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex flex-col gap-2">
              <input
                type="search"
                placeholder="Buscar perfumes…"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-neutral-900/70 text-emerald-300"
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/carrito"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900"
              >
                Carrito (0)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
