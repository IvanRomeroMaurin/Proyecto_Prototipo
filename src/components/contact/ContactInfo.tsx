// components/contact/ContactInfo.tsx
type ContactInfoProps = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export default function ContactInfo({ address, phone, email, hours }: ContactInfoProps) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      <h2 className="text-xl font-semibold text-white">Datos de contacto</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 text-neutral-400">Dirección</dt>
          <dd className="text-neutral-200">{address}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 text-neutral-400">Teléfono</dt>
          <dd className="text-neutral-200">{phone}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 text-neutral-400">Email</dt>
          <dd className="text-neutral-200">{email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 text-neutral-400">Horario</dt>
          <dd className="text-neutral-200">{hours}</dd>
        </div>
      </dl>
    </div>
  );
}
