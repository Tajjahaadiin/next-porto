'use server'
import { db } from '@/db'
import { work, WorkSchema } from '@/db/schema/experiences'
import { project, ProjectSchema } from '@/db/schema/project'
import {
  SelectTechstackModel,
  techstack,
  TechStackSchema,
} from '@/db/schema/techstack'
import { user, UserSchema } from '@/db/schema/user'
import { mockUpdateProject } from '@/lib/_mock'
import { eq } from 'drizzle-orm'
export async function getUser() {
  const user = await db.query.user.findMany({
    columns: {
      id: false,
      email: false,
      password: false,
      createdAt: false,
      updatedAt: false,
    },
  })
  console.log(user)
}
export async function getUserwithData() {
  const user = await db.query.user.findMany()
  console.log(user)
  return user[0]
}
export async function getProjects() {
  const project = await db.query.project.findMany()
  // console.log('project', project)
  return project
}
export async function getTechstacks() {
  const techstack = await db.query.techstack.findMany()
  // console.log('techstack', techstack)
  return techstack
}
export async function getExperiences() {
  const experiences = await db.query.work.findMany()
  // console.log('experiences', experiences)
  return experiences
}

export async function updateTechStack(
  data: Omit<Extract<TechStackSchema, { mode: 'edit' }>, 'mode'>
) {
  const { id, ...restData } = data
  await db.update(techstack).set(restData).where(eq(techstack.id, id))
}
export async function updateProject(
  data: Omit<Extract<ProjectSchema, { mode: 'edit' }>, 'mode'>
) {
  const { id, ...restData } = data
  await db.update(project).set(restData).where(eq(project.id, id))
}
export async function updateExperiences(
  data: Omit<Extract<WorkSchema, { mode: 'edit' }>, 'mode'>
) {
  const { id, ...restData } = data
  await db.update(work).set(restData).where(eq(work.id, id))
}
// getUser()
// getExperiences()
// getProjects()
// getTechstacks()

// updateUser(mockUserUpdate())
// updateExperiences(mockUpdateWork())
// updateTechStack(mockUpdateTechstack())
// updateProject(mockUpdateProject())
