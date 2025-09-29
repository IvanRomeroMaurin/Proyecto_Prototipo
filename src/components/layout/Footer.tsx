// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Le Parfum</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Fragancias de autor, envíos a todo el país. Calidad curada con
              amor por el detalle.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-200">Tienda</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><Link href="/novedades" className="hover:text-white">Novedades</Link></li>
              <li><Link href="/best-sellers" className="hover:text-white">Best Sellers</Link></li>
              <li><Link href="/unisex" className="hover:text-white">Unisex</Link></li>
              <li><Link href="/regalos" className="hover:text-white">Regalos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-200">Empresa</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
              <li><Link href="/sustentabilidad" className="hover:text-white">Sustentabilidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
              <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-200">Suscripción</h4>
            <p className="mt-3 text-sm text-neutral-400">
              Ofertas y lanzamientos en tu mail.
            </p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Unirme
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 md:flex-row">
          <p>© {new Date().getFullYear()} Le Parfum. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-neutral-300">Privacidad</Link>
            <Link href="/terminos" className="hover:text-neutral-300">Términos</Link>
            <Link href="/reembolsos" className="hover:text-neutral-300">Reembolsos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
