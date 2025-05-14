'use server'
import { db } from '@/db'
import { user, userSchema, UserSchema } from '@/db/schema/user'
import { eq } from 'drizzle-orm'
import { executeAction } from '@/db/utils/executeAction'
import { revalidatePath } from 'next/cache'
import { techstack } from '@/db/schema'
import { TechStackSchema } from '@/db/schema/techstack'

export async function updateTechStack(
  data: Omit<Extract<TechStackSchema, { mode: 'edit' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      const { id, ...restData } = data
      await db
        .update(techstack)
        .set({ ...restData, updatedAt: new Date() })
        .where(eq(techstack.id, id))
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks updated successfully',
    serverErrorMessage: 'update',
  })
}
export async function createTechStack(
  data: Omit<Extract<TechStackSchema, { mode: 'create' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.insert(techstack).values(data)
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks created successfully',
    serverErrorMessage: 'create',
  })
}
export async function deleteTechStack(
  data: Omit<Extract<TechStackSchema, { mode: 'delete' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      await db.delete(techstack).where(eq(techstack.id, data.id))
      console.log('done')
      revalidatePath('/techstacks')
    },
    isProtected: false,
    clientSuccessMessage: 'techstacks delete successfully',
    serverErrorMessage: 'delete',
  })
}
