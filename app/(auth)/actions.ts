
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  
  if (error) {
    return { error: 'Invalid credentials' };
  }
  
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  
  if (error) {
    return { error: 'Failed to create account' };
  }
  
  redirect('/');
}
