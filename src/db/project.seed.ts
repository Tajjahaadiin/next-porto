import { drizzle } from 'drizzle-orm/node-postgres'
import {
  projectTechStack,
  projects,
  NewProjectTechStackEntry,
} from './schema/schema'
import { Client } from 'pg'
import 'dotenv/config'
import { ProjectList } from '@/types/project.entity'

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
})
const db = drizzle(client)

const mockProjects: ProjectList = [
  {
    imageUrl: '/circle.png',
    projectName: 'Circle App',
    description:
      'A streamlined social media application built with Next.js, TypeScript, Node.js, and Tailwind CSS. This simplified Twitter clone allows users to create and engage with threads, like and comment on posts, and customize their profiles.',
    techStack: ['react.js', 'TypeScript', 'chakra-ui', 'express.js'],
    link: 'https://foundation-circle.vercel.app/',
    isPrivate: false, // Changed to false based on typical project visibility
  },
  {
    imageUrl: '/issuetracking.png',
    projectName: 'Mode',
    description:
      'Introducing Mode, an efficient issue tracking solution developed with Next.js, TypeScript, Node.js, and styled using Tailwind CSS. Inspired by Linear, Mode offers a focused approach to task management, bug tracking, and project workflow.',
    techStack: ['Next.js', 'Neon', 'Shadcn', 'PostgreSQL'],
    link: '',
    isPrivate: false,
  },
  // Add more dummy data here
]

async function seed() {
  console.log('👀 connecting database...')
  await client.connect()
  console.log('🚀 Seeding database...')

  try {
    // Optional: Clear existing data before seeding (Use with extreme caution!)
    // This is helpful for development to start fresh, but NEVER do this
    // in production unless you fully understand the consequences.
    // console.log("🗑️ Clearing existing data...");
    // await db.delete(projectTechStack);
    // await db.delete(projects);
    // console.log("✅ Existing data cleared.");

    const now = new Date().toISOString() // Get current timestamp

    console.log('🌱 Inserting projects and project technologies...')

    for (const projectData of mockProjects) {
      // 1. Insert the project into the 'projects' table
      const insertedProjects = await db
        .insert(projects)
        .values({
          imageUrl: projectData.imageUrl,
          projectName: projectData.projectName,
          description: projectData.description,
          link: projectData.link,
          isPrivate: projectData.isPrivate,
          createdAt: now, // Set creation timestamp
          updatedAt: now, // Set update timestamp initially
        })
        // Use .returning() to get the generated ID of the inserted project
        .returning({ id: projects.id })

      // Check if insertion was successful and get the project ID
      if (insertedProjects.length === 0 || !insertedProjects[0].id) {
        console.warn(
          `⚠️ Failed to insert project: ${projectData.projectName}. Skipping tech stack insertion.`
        )
        continue // Skip to the next project if insertion failed
      }

      const projectId = insertedProjects[0].id
      console.log(
        `   Inserted project "${projectData.projectName}" with ID ${projectId}.`
      )

      // 2. Prepare data for the 'project_tech_stack' table
      const techStackEntries: NewProjectTechStackEntry[] =
        projectData.techStack.map((techName) => ({
          projectId: projectId, // Link to the project we just inserted
          techName: techName, // The technology name string
        }))

      // 3. Insert the tech stack entries for this project into the 'project_tech_stack' table
      if (techStackEntries.length > 0) {
        await db
          .insert(projectTechStack)
          .values(techStackEntries)
          // Use onConflictDoNothing() in case a project/techName pair somehow already exists
          // (less likely in a fresh seed, but good practice)
          .onConflictDoNothing()
        console.log(
          `   Inserted ${techStackEntries.length} tech stack entries for project ID ${projectId}.`
        )
      } else {
        console.log(`   No tech stack entries for project ID ${projectId}.`)
      }
    }

    console.log('✅ Projects and technologies inserted.')
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

  console.log('🌳 Seeding complete.')
  await client.end()
}

// Execute the seeding function
seed()
