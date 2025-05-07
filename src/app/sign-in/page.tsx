'use client'

import { UserForm } from '@/app/_components/user-form'
import { SessionProvider } from 'next-auth/react'
import SignIn from './sign-in'

export default function Page() {
  return (
    <SessionProvider>
      <SignIn />
    </SessionProvider>
  )
}
