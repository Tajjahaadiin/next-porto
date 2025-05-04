import { db } from '@/db/db'
import { technologies } from '@/db/schemas/schema'

// const database = drizzle({ schema })

export async function getTechstack() {
  const rows = await db.select().from(technologies)
  return rows
}
