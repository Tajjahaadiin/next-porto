import { db } from '@/db/db'
import { technologies } from '@/db/schemas/profile'

export async function getTechstack() {
  const rows = await db.select().from(technologies)
  return rows
}
