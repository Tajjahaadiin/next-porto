import { db } from '@/db'
import { projects, projectTechStack } from '@/db/schema/schema'
import { eq } from 'drizzle-orm'
export async function getProjects() {
  const rows = await db.select().from(projects).limit(5)
  return rows
}

// Assuming your desired interface looks like this:
export interface ProjectWithTechStack {
  id: number // Add ID as it's selected
  imageUrl: string
  projectName: string
  description: string
  techStack: string[] // This is the array we want
  link: string | null // Link can be null based on schema
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

export async function getProjectsWithTechStack(): Promise<
  ProjectWithTechStack[]
> {
  const rows = await db
    .select({
      // Select columns from the projects table
      id: projects.id,
      imageUrl: projects.imageUrl,
      projectName: projects.projectName,
      description: projects.description,
      link: projects.link,
      isPrivate: projects.isPrivate,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      // Select the techName from the joined projectTechStack table
      techName: projectTechStack.techName, // This will be null if no tech stack entries for a project
    })
    .from(projects)
    .leftJoin(projectTechStack, eq(projects.id, projectTechStack.projectId))
    .orderBy(projects.createdAt) // Optional: add ordering
  console.table(rows)
  // 2. Transform the flat result rows into the desired nested structure (ProjectWithTechStack[])

  const result: ProjectWithTechStack[] = []
  const projectMap = new Map<number, ProjectWithTechStack>()

  for (const row of rows) {
    // If we haven't seen this project ID before, create the main project object
    if (!projectMap.has(row.id)) {
      const project = {
        id: row.id,
        imageUrl: row.imageUrl,
        projectName: row.projectName,
        description: row.description,
        techStack: [], // Initialize empty array
        link: row.link,
        isPrivate: row.isPrivate,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }
      projectMap.set(row.id, project)
      result.push(project) // Add to the final result array
    }

    // Add the technology name to the techStack array of the correct project
    const project = projectMap.get(row.id)! // Get the project object from the map
    if (row.techName) {
      // Only add if techName is not null (i.e., there was a match in projectTechStack)
      project.techStack.push(row.techName)
    }
  }

  return result // Return the array of transformed project objects
}

// Example usage:
// async function fetchAndLogProjects() {
//   const projects = await getProjectsWithTechStack();
//   console.log(JSON.stringify(projects, null, 2));
// }
// fetchAndLogProjects().catch(console.error);
