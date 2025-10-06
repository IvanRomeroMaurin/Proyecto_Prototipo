// src/app/auth/check-email/CheckEmailClient.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function CheckEmailClient() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold mb-3">Revisá tu correo</h1>
      <p className="text-sm opacity-80">
        {email
          ? `Te enviamos un enlace de verificación a ${email}.`
          : "Te enviamos un enlace de verificación a tu correo."}
      </p>
      <p className="text-xs mt-3 opacity-60">
        Si no lo ves, revisá la carpeta de spam/promociones.
      </p>
    </main>
  );
}
