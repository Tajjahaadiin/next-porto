import { db } from '@/db/db'
import { profileTable } from '@/db/schemas/schema'

export async function getContent() {
  const rows = await db.select().from(profileTable).limit(1)
  return rows[0]
}
