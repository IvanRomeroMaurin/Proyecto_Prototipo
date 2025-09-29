// components/home/PromoBanner.tsx
import Badge from "@/components/ui/Badge";

export default function PromoBanner() {
  return (
    <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-3">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-10">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white">
              “Notas amaderadas con toques cítricos”
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Curaduría que equilibra elegancia y presencia. Probá la selección top de la temporada.
            </p>
            <div className="mt-5 flex gap-3">
              <Badge>Envío 24/48h</Badge>
              <Badge>3 y 6 cuotas</Badge>
            </div>
          </div>
          <div className="h-40 rounded-xl border border-neutral-800 md:h-48">
            <div
              className="h-full w-full"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, rgba(16,185,129,0.25), rgba(16,185,129,0.1), rgba(0,0,0,0.2))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
