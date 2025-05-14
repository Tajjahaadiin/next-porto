import { SessionProvider } from 'next-auth/react'
import SignOutForm from './_components/signout-form'

export default function Page() {
  return (
    <SessionProvider>
      <SignOutForm />
    </SessionProvider>
  )
}
