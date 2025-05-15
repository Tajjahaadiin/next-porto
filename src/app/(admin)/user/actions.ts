'use server'
import { db } from '@/db'
import { user, userSchema, UserSchema } from '@/db/schema/user'
import { eq } from 'drizzle-orm'
import { executeAction } from '@/db/utils/executeAction'
import { revalidatePath } from 'next/cache'
export async function updateUser(
  data: Omit<Extract<UserSchema, { mode: 'update' }>, 'mode'>
) {
  return executeAction({
    actionFn: async () => {
      const { id, ...restData } = data
      await db.update(user).set(restData).where(eq(user.id, id))
      console.log('done')
      revalidatePath('/user')
      revalidatePath('/')
    },
    isProtected: false,
    clientSuccessMessage: 'data updated successfully',
    serverErrorMessage: 'update',
  })
}
