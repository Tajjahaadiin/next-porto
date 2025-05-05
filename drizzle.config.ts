import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import env from '@/lib/env'

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.NEXT_PUBLIC_DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
