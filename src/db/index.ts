import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '@/db/schema'
import env from '@/lib/env'

const sql = neon(env.NEXT_PUBLIC_DATABASE_URL)

export const db = drizzle({ client: sql, schema })
export type DB = typeof db
