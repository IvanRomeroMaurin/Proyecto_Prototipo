// components/contact/ContactHeader.tsx
export default function ContactHeader() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,197,94,0.25), rgba(34,197,94,0.1), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Ayuda • Soporte • Ventas
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-neutral-400">
            Escribinos para consultas de productos, envíos, mayoristas o postventa.
          </p>
        </div>
      </div>
    </section>
  );
}
