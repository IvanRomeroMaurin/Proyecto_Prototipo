// src/app/auth/check-email/page.tsx
import { Suspense } from "react";
import CheckEmailClient from "./CheckEmailClient";

// Forzamos render dinámico para evitar problemas de pre-render con search params
export const dynamic = "force-dynamic";

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm opacity-80">Cargando…</div>}>
      <CheckEmailClient />
    </Suspense>
  );
}
