// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ user: null }, { status: 200 });

  const { data: perfil } = await supabase
    .from('usuarios')
    .select('id_usuario, auth_user_id, nombre, apellido, telefono, email, rol, activo, created_at, updated_at')
    .eq('auth_user_id', user.id)
    .single();

  return NextResponse.json({ user, perfil }, { status: 200 });
}
