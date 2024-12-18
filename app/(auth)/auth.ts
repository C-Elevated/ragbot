
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

export async function signIn(provider: 'credentials', credentials: { email: string; password: string; redirect?: boolean }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) throw error;
  return data;
}

export async function signOut({ redirectTo }: { redirectTo: string }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  await supabase.auth.signOut();
  return redirectTo;
}
