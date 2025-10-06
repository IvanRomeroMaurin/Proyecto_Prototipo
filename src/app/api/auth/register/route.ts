// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { email, password, nombre, apellido, telefono } = (await req.json()) as Body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email y password son requeridos" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();

    // ¡Importante! Dejá SOLO el signUp; el perfil se crea por trigger en DB.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellido, telefono },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
          : undefined,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch {
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
