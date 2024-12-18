
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function auth() {
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getRequestHeader: () => undefined,
    getCookie: (name) => cookies().get(name)?.value,
    setCookie: (name, value, options) => cookies().set(name, value, options),
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getRequestHeader: () => undefined,
    getCookie: (name) => cookies().get(name)?.value,
    setCookie: (name, value, options) => cookies().set(name, value, options),
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut({ redirectTo }: { redirectTo: string }) {
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getRequestHeader: () => undefined,
    getCookie: (name) => cookies().get(name)?.value,
    setCookie: (name, value, options) => cookies().set(name, value, options),
  });

  await supabase.auth.signOut();
  return redirectTo;
}
