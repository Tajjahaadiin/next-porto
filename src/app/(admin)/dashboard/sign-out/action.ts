'use server'

import { signOut } from '@/lib/auth'

export async function signOutAction() {
  console.log('masuk')
  await signOut({ redirectTo: '/sign-in' }) // or use your redirect logic
}
