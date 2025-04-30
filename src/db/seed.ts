// src/lib/db/seed.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { profileTable } from './schemas/profile'
import { Client } from 'pg'
import 'dotenv/config'

const client = new Client({ connectionString: process.env.DATABASE_URL })
const db = drizzle(client)

async function seed() {
  await client.connect()

  await db.insert(profileTable).values({
    surname: 'Tajj',
    motto: 'Aspiring Fullstack Developer',
    location: 'Depok Sawangan, Indonesia',
    content: `So glad you stopped by! I'm an enthusiastic aspiring React developer eager to create intuitive and enjoyable web experiences. I'm excited to share my work with you! Explore my projects to see how I'm putting my React skills into practice. Feel free to connect and say hello!`,
    image: 'profiles.jpg',
    isAvailable: true,
  })

  await client.end()
}

seed().catch(console.error)
