// components/home/Categories.tsx
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = ["Amaderados", "Cítricos", "Orientales"];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <SectionHeader
        title="Categorías destacadas"
        subtitle="Explorá por familia olfativa."
        href="/colecciones"
        linkLabel="Ver todas"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {categories.map((name) => (
          <Link
            key={name}
            href={`/colecciones?f=${encodeURIComponent(name)}`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 transition hover:border-emerald-600/40 hover:bg-neutral-900/60"
          >
            <div className="h-28 w-full rounded-xl border border-neutral-800" />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{name}</span>
              <span className="text-sm text-emerald-300 opacity-0 transition group-hover:opacity-100">
                Ver →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
