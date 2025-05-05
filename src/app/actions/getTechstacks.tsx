import { db } from '@/db'
import { technologies } from '@/db/schema/schema'

// const database = drizzle({ schema })

export async function getTechstack() {
  const rows = await db.select().from(technologies)
  return rows
}
