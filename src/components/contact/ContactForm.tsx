// components/contact/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
    acepta: false,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.acepta) {
      alert("Debés aceptar la política de privacidad para enviar.");
      return;
    }
    setSending(true);

    // Simulación de envío: reemplazar por fetch('/api/contacto', { method:'POST', body: JSON.stringify(form) })
    setTimeout(() => {
      setSending(false);
      alert("¡Gracias! Tu consulta fue enviada.");
      setForm({ nombre: "", email: "", asunto: "", mensaje: "", acepta: false });
    }, 800);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      <h2 className="text-xl font-semibold text-white">Dejanos tu consulta</h2>
      <p className="mt-1 text-sm text-neutral-400">Respondemos dentro de las 24–48 hs hábiles.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="mb-1 block text-xs font-medium text-neutral-400">Nombre</label>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-xs font-medium text-neutral-400">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-neutral-400">Asunto</label>
          <input
            type="text"
            required
            value={form.asunto}
            onChange={(e) => setForm({ ...form, asunto: e.target.value })}
            placeholder="Tema de tu consulta"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-neutral-400">Mensaje</label>
          <textarea
            required
            rows={6}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            placeholder="Contanos en qué podemos ayudarte…"
            className="w-full resize-y rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={form.acepta}
              onChange={(e) => setForm({ ...form, acepta: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-emerald-500 focus:ring-emerald-400"
            />
            <span>
              Acepto la{" "}
              <a href="/privacidad" className="text-emerald-300 underline hover:text-emerald-200">
                política de privacidad
              </a>{" "}
              y autorizo el contacto por los medios informados.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60"
        >
          {sending ? "Enviando…" : "Enviar consulta"}
        </button>

        {/* Alternativa: mailto directo */}
        <a
          href={`mailto:hola@leparfum.ar?subject=${encodeURIComponent(
            form.asunto || "Consulta desde el sitio"
          )}&body=${encodeURIComponent(
            `Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`
          )}`}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950 px-6 py-3 text-sm font-semibold text-neutral-200 hover:border-emerald-600/40 hover:bg-neutral-900"
        >
          Enviar por correo
        </a>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        * Este formulario es de demostración. Podés reemplazar el envío simulado por un endpoint real
        en <code className="text-neutral-400">/api/contacto</code>.
      </p>
    </form>
  );
}
