import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function PATCH(req: Request) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No auth' }, { status: 401 })

  const body = await req.json() as { nombre?: string; apellido?: string; telefono?: string }
  const { data, error } = await supabase
    .from('usuarios')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('auth_user_id', user.id)
    .select('id_usuario, nombre, apellido, telefono, email, rol, activo, updated_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ perfil: data })
}
