'use server'
import { sql, Table } from 'drizzle-orm'

import { db, DB } from '@/db'
import * as schema from '@/db/schema'
import * as seeds from '@/db/seeds'

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`)
}
async function main() {
  for (const table of [
    schema.user,
    schema.techstack,
    schema.work,
    schema.project,
  ]) {
    await resetTable(db, table)
  }
  await seeds.user(db)
  await seeds.techstack(db)
  await seeds.experiences(db)
  await seeds.project(db)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('seeding done!!')
    process.exit(1)
  })
