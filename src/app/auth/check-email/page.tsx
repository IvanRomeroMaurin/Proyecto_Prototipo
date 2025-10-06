"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function CheckEmailPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const defaultEmail = sp.get("email") ?? "";
  const [email, setEmail] = useState(defaultEmail);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function resend() {
    setSending(true);
    setMsg(null);
    setErr(null);

    if (!email) {
      setErr("Ingresá tu email para reenviar la confirmación.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || data?.error) {
        setErr(data?.error || "No se pudo reenviar el correo.");
      } else {
        setMsg("Te enviamos un nuevo correo de confirmación.");
      }
    } catch {
      setErr("Fallo de red o servidor no disponible.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-950 px-4">
      <div className="relative w-full max-w-md py-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-emerald-400/5 blur-3xl" />

        <div className="w-full rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.7)]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">Verificá tu email</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Te enviamos un enlace de confirmación a{" "}
              <span className="font-medium text-emerald-300">
                {email || "tu correo"}
              </span>. Abrilo para activar la cuenta.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs text-neutral-400">Correo electrónico</label>
            <input
              className="w-full rounded-2xl bg-neutral-900/80 border border-neutral-800 px-4 py-3 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-500/40"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {err && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {err}
              </div>
            )}
            {msg && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                {msg}
              </div>
            )}

            <button
              onClick={resend}
              disabled={sending}
              className="w-full rounded-2xl bg-emerald-500/90 px-4 py-3 font-semibold text-neutral-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60"
            >
              {sending ? "Reenviando…" : "Reenviar correo de confirmación"}
            </button>

            <div className="mt-4 grid gap-2 text-sm">
              <button
                onClick={() => router.push("/auth/login")}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-medium text-neutral-300 transition hover:border-emerald-600/40 hover:text-emerald-300"
              >
                Ya confirmé → Iniciar sesión
              </button>
              <Link
                href="/auth/register"
                className="text-center text-neutral-400 underline-offset-4 hover:text-emerald-300 hover:underline"
              >
                ¿Equivocaste el email? Volver al registro
              </Link>
            </div>

            <div className="mt-6 text-center text-xs text-neutral-500">
              Tip: revisá <b>Spam</b> / <b>No deseados</b> si no lo ves.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
