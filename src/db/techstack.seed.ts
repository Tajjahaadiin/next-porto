import { drizzle } from 'drizzle-orm/node-postgres'
import { technologies } from './schemas/schema'
import { Client } from 'pg'
import 'dotenv/config'

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
})
const db = drizzle(client)

const mockTechStack = [
  {
    techName: 'typescript',
    imageUrl: '/techstack/typescript.png',
  },
  {
    techName: 'tailwind',
    imageUrl: '/techstack/tailwind.png',
  },
  {
    techName: 'postgres',
    imageUrl: '/techstack/postgres.png',
  },

  {
    techName: 'nextjs',
    imageUrl: '/techstack/next.png',
  },
  {
    techName: 'expressjs',
    imageUrl: '/techstack/expressjs.png',
  },
]

async function seed() {
  try {
    console.log('👀 connecting database...')
    await client.connect()
    console.log('🚀 Seeding database...')
    // Clear existing data (Optional - be careful with this in production!)
    // console.log("🗑️ Clearing technologies table...");
    // await db.delete(technologies);
    // console.log("✅ Technologies table cleared.");

    console.log('🌱 Inserting technologies...')
    // Use insert and values to add the data
    // onConflictDoNothing() is useful if you might run the seed script multiple times
    // and don't want to insert duplicates based on a unique constraint (like 'name' if you added one)
    // or primary key conflicts (though ID is auto-generated here)
    await db.insert(technologies).values(mockTechStack)

    console.log('✅ Technologies inserted.')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1) // Exit with a failure code
  } finally {
    // Important: Close the database connection if your DB setup requires it (e.g., node-postgres Pool)
    // If you're using a serverless driver or similar, this might not be necessary.
    // Check your db setup file for an exported client instance to end.
    if ((db as any).client && typeof (db as any).client.end === 'function') {
      await (db as any).client.end()
      console.log('🔌 Database connection closed.')
    } else if (
      (db as any).connection &&
      typeof (db as any).connection.end === 'function'
    ) {
      // For some drivers like PlanetScale serverless
      await (db as any).connection.end()
      console.log('🔌 Database connection closed.')
    }
  }

  console.log('🌳 Seeding complete.')
  await client.end()
}

seed()
