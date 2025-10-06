// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

type Body = {
  email: string
  password: string
  nombre?: string
  apellido?: string
  telefono?: string
}

export async function OPTIONS() {
  // CORS simple para tests locales (ajustalo según tu frontend real)
  return NextResponse.json({}, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const { email, password, nombre, apellido, telefono } = (await req.json()) as Body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y password son requeridos' }, { status: 400 })
    }

    // Inicializamos Supabase Client con las keys públicas (anon)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 🔹 Registro con redirección para confirmar email
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellido, telefono }, // metadatos personalizados
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, // callback que maneja exchangeCodeForSession
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // ⚠️ NO insertes manualmente en `public.usuarios`
    // El trigger SQL lo hará automáticamente cuando el usuario confirme su correo.

    return NextResponse.json(
      {
        message: 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.',
        user: data.user,
      },
      { status: 200 }
    )
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error inesperado'
    console.error('REGISTER_ERROR', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
