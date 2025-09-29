// components/home/Hero.tsx
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,197,94,0.25), rgba(34,197,94,0.1), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>Nueva Colección • Otoño</Badge>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Perfumes de autor para dejar{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
              huella
            </span>
          </h1>
          <p className="mt-6 text-base/7 text-neutral-400 md:text-lg/8">
            Descubrí fragancias únicas, seleccionadas por expertos. Estética oscura con
            acentos esmeralda.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/colecciones"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Ver colecciones
            </Link>
            <Link
              href="/ofertas"
              className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900/40"
            >
              Ofertas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
