import { db } from '@/db'
import { profileTable } from '@/db/schema/schema'

export async function getContent() {
  const rows = await db.select().from(profileTable).limit(1)
  return rows[0]
}
