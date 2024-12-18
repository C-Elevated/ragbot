
import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
