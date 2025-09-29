// components/contact/MapEmbed.tsx
type MapEmbedProps = {
  query: string;     // texto de búsqueda (ej: "Curuzú Cuatiá, Corrientes, Argentina")
  title?: string;
  note?: string;
  height?: number;
};

export default function MapEmbed({
  query,
  title = "Estamos acá mismo",
  note = "Mapa centrado en tu ubicación estimada",
  height = 320,
}: MapEmbedProps) {
  const mapQuery = encodeURIComponent(query);
  const src = `https://www.google.com/maps?q=${mapQuery}&hl=es&z=13&output=embed`;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40">
      <div className="p-4 border-b border-neutral-800">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-neutral-400">{note}</p>
      </div>
      <div className="p-3">
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <iframe
            title="Mapa - Le Parfum"
            src={src}
            width="100%"
            height={height}
            loading="lazy"
            className="block"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
