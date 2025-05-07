import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import * as schema from '@/db/schema'
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!)
export const db = drizzle({ client: sql, schema })
export type DB = typeof db
