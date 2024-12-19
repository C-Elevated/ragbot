
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  const supabase = createClient();

  if (token && type) {
    // Handle OTP verification
    const { error } = await supabase.auth.verifyOtp({ 
      token_hash: token, 
      type: type as any 
    });
    
    if (error) {
      console.error('Error verifying OTP:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (code) {
    // Handle OAuth/magic link flow
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
