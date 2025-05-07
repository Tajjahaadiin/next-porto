import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { neon } from '@neondatabase/serverless'
import config from '$/drizzle.config'

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!)
console.log('string', process.env.NEXT_PUBLIC_DATABASE_URL)
export const db = drizzle({ client: sql })
async function main() {
  console.log('Starting database migration...') // Added log
  if (config.out) {
    // Use the migrate function imported from drizzle-orm/neon-http/migrator
    await migrate(db, { migrationsFolder: config.out })
    console.log('Migration Complete 👏')
  } else {
    console.error("Migration folder 'out' not specified in drizzle.config.ts")
  }
}
main().catch((e) => {
  console.error('Migration failed ❌') // Added error log
  console.error(e)
  process.exit(1) // Exit with a non-zero code on failure
})
