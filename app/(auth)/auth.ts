
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function auth() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  });
  
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
