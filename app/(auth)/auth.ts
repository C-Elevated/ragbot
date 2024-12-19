
import { type User } from '@/lib/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const [user] = await db.select().from(users).where(eq(users.email, credentials.email));
        if (!user) return null;
        
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  }
});
