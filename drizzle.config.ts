import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './src/db/migration',
  schema: './src/db/schemas/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
})
