import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(8).max(200),
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten() }, { status: 422 });
    }

    const { email, password } = parsed.data;
    const supabase = await createSupabaseServer(); // 👈 await
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return NextResponse.json({ error: error.message }, { status: 401 });

    // data.session ya está en cookies (httpOnly). Podés devolver el perfil básico desde tu tabla si querés.
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('LOGIN_SBAUTH_ERROR', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
