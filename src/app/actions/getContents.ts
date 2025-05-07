import { db } from '@/db'
import { user } from '@/db/schema'

export async function getContent() {
  const rows = await db.select().from(user).limit(1)
  console.log(rows[0])
  return rows[0]
}
