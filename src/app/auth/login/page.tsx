"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthCard from "@/components/AuthCard";

const loginSchema = z.object({
  email: z.string().min(1, "Email requerido").email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida").min(6, "Mínimo 6 caracteres"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFields>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFields, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof LoginFields;
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data?.error || "Error al iniciar sesión");
        return;
      }

      router.push("/");
    } catch {
      setServerError("Fallo de red o servidor no disponible");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-950">
      <div className="relative w-full max-w-md px-4 py-8">
        {/* halo suave acorde al navbar */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-emerald-400/5 blur-3xl" />

        <AuthCard
          title="Bienvenido"
          subtitle="Inicia sesión para continuar"
          footer={
            <p className="text-sm text-neutral-400">
              ¿No tienes cuenta?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-emerald-300 underline-offset-4 hover:text-emerald-200 hover:underline"
              >
                Crear una cuenta
              </Link>
            </p>
          }
          // extra clases al card para mimetizar con tu UI
          className="border-neutral-800 bg-neutral-900/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,.7)]"
        >
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-neutral-300 mb-1.5">Email</label>
              <input
                type="email"
                autoComplete="email"
                className={cn(
                  "w-full rounded-2xl bg-neutral-900/80 border border-neutral-800 px-4 py-3 text-neutral-100",
                  "placeholder-neutral-500 outline-none shadow-inner",
                  "focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-500/40",
                  errors.email && "border-red-500/60 focus:ring-red-400/50"
                )}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={reveal ? "text" : "password"}
                  autoComplete="current-password"
                  className={cn(
                    "w-full rounded-2xl bg-neutral-900/80 border border-neutral-800 px-4 py-3 pr-12 text-neutral-100",
                    "placeholder-neutral-500 outline-none shadow-inner",
                    "focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-500/40",
                    errors.password && "border-red-500/60 focus:ring-red-400/50"
                  )}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setReveal((r) => !r)}
                  className="absolute inset-y-0 right-2 my-auto rounded-lg px-2 text-xs text-neutral-400 hover:bg-neutral-800/70 hover:text-neutral-200"
                >
                  {reveal ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
            </div>

            {serverError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full rounded-2xl bg-emerald-500/90 px-4 py-3 font-semibold text-neutral-950",
                "transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400",
                "shadow-[0_6px_20px_-6px_rgba(16,185,129,.6)] active:translate-y-[1px]",
                "disabled:opacity-60"
              )}
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
