import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function AuthCard({ title, subtitle, children, footer, className }: Props) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] relative overflow-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
      </div>

      {children}

      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
}
