import { drizzle } from 'drizzle-orm/node-postgres'
import { NewTestArray, table } from './schema/schema'
import { Client } from 'pg'
import 'dotenv/config'

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
})
const db = drizzle(client)

const mocktestArray: NewTestArray = {
  mood: 'happy',
  testArray: 'oh good',
  tags1: ['React.js', 'Neon', 'Shadcn', 'PostgreSQL'],
  tags2: ['React.js', 'Neon', 'Shadcn', 'PostgreSQL'],
}

async function update() {
  console.log('👀 connecting database...')
  await client.connect()
  console.log('🚀 Updateing database...')

  try {
    // Optional: Clear existing data before seeding (Use with extreme caution!)
    // This is helpful for development to start fresh, but NEVER do this
    // in production unless you fully understand the consequences.
    // console.log('🗑️ Clearing existing data...')
    // await db.delete(table)
    // await db.delete(projects);
    // console.log('✅ Existing data cleared.')
    console.log('🌱 Updating...')
    await db.update(table).set(mocktestArray)

    console.log('✅ Update completed.')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1) // Exit with a failure code
  } finally {
    // Important: Close the database connection if your DB setup requires it
    // Check your db setup file for an exported client instance to end.
    if (client && typeof client.end === 'function') {
      await client.end()
      console.log('🔌 Database connection closed.')
    }
  }

  console.log('🌳 Update complete.')
  await client.end()
}

update()
