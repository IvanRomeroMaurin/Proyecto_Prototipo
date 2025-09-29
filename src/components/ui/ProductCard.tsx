// components/ui/ProductCard.tsx
type Props = {
  title: string;
  price: string;
  note: string;
  onAdd?: () => void;
};

export default function ProductCard({ title, price, note, onAdd }: Props) {
  return (
    <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 transition hover:-translate-y-0.5 hover:border-emerald-600/40 hover:bg-neutral-900/60">
      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-neutral-800">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(16,185,129,0.25),transparent)] opacity-30" />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-neutral-400">{note}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-emerald-300">{price}</span>
          <button
            onClick={onAdd}
            className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:border-emerald-600/40 hover:bg-neutral-900"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
