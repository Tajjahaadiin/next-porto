import { db } from '@/db/db'
import { profileTable } from '@/db/schemas/profile'

export async function getContent() {
  const rows = await db.select().from(profileTable).limit(1)
  return rows[0]
}
