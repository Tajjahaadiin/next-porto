'use server'
import { db } from '@/db'
import { work, WorkSchema } from '@/db/schema/experiences'
import { executeAction } from '@/db/utils/executeAction'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateExperiences(
  data: Omit<Extract<WorkSchema, { mode: 'edit' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      const { id, ...restData } = data
      await db.update(work).set(restData).where(eq(work.id, id))
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks updated successfully',
    serverErrorMessage: 'update',
  })
}
export async function createExperiences(
  data: Omit<Extract<WorkSchema, { mode: 'create' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.insert(work).values(data)
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks updated successfully',
    serverErrorMessage: 'update',
  })
}
export async function deleteExperiences(
  data: Omit<Extract<WorkSchema, { mode: 'delete' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.delete(work).where(eq(work.id, data.id))
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks delete successfully',
    serverErrorMessage: 'delete',
  })
}
