// components/home/Recommended.tsx
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";

export default function Recommended() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <SectionHeader
        title="Recomendados"
        subtitle="Inspirados en tendencias, listos para vos."
        href="/best-sellers"
        linkLabel="Ver más"
      />

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard title="Bois Vert" price="$ 59.990" note="Amaderado • Unisex" />
        <ProductCard title="Citrus Lumière" price="$ 49.990" note="Cítrico • Fresco" />
        <ProductCard title="Noir Intense" price="$ 69.990" note="Oriental • Noche" />
        <ProductCard title="Verde Selva" price="$ 54.990" note="Aromático • Diario" />
      </div>

      <div className="mt-12 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">
              Probá nuestro kit de muestras
            </h3>
            <p className="mt-2 max-w-2xl text-neutral-400">
              Elegí 4 miniaturas y te bonificamos el envío en tu próxima compra.
            </p>
          </div>
          <Link
            href="/kit-muestras"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Armar kit
          </Link>
        </div>
      </div>
    </section>
  );
}
