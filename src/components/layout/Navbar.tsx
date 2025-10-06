export const dynamic = "force-dynamic";
export const revalidate = 0;

import NavbarClient from "./NavbarClient";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const initialUser = user
    ? { id: user.id, email: user.email, user_metadata: user.user_metadata }
    : null;

  return <NavbarClient initialUser={initialUser} />;
}
