// app/contacto/page.tsx
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <ContactHeader />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Columna izquierda: info + mapa */}
          <div className="space-y-6 lg:col-span-2">
            <ContactInfo
              address="San Martín 1234, Curuzú Cuatiá, Corrientes"
              phone="+54 9 3774 555-000"
              email="hola@leparfum.ar"
              hours="Lun a Vie 9:00–13:00 / 16:30–20:30 · Sáb 9:00–13:00"
            />
            <MapEmbed
              query="Curuzú Cuatiá, Corrientes, Argentina"
              note="Curuzú Cuatiá, Corrientes (mapa centrado en tu ubicación estimada)"
            />
          </div>

          {/* Columna derecha: formulario */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
