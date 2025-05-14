'use server'
import { db } from '@/db'
import {
  InserProject,
  project,
  ProjectSchema,
  UpdateProject,
} from '@/db/schema/project'
import { executeAction } from '@/db/utils/executeAction'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateProject(
  data: Omit<Extract<UpdateProject, { mode: 'edit' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      const { id, ...restData } = data
      await db.update(project).set(restData).where(eq(project.id, id))
      console.log('done')
      revalidatePath('/projects')
    },
    isProtected: false,
    clientSuccessMessage: 'projects updated successfully',
    serverErrorMessage: 'update',
  })
}
export async function createProject(
  data: Omit<Extract<InserProject, { mode: 'create' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.insert(project).values(data)
      console.log('done')
      revalidatePath('/projects')
    },
    isProtected: false,
    clientSuccessMessage: 'project created successfully',
    serverErrorMessage: 'create',
  })
}
export async function deleteProject(
  data: Omit<Extract<ProjectSchema, { mode: 'delete' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.delete(project).where(eq(project.id, data.id))
      console.log('done')
      revalidatePath('/projects')
    },
    isProtected: false,
    clientSuccessMessage: 'project deleted successfully',
    serverErrorMessage: 'delete',
  })
}
