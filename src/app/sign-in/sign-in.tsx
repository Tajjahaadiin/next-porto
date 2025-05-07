import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { UserForm } from '@/app/_components/user-form'
export default function SignIn() {
  return (
    <main className="flex  flex-col min-w-screen min-h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center min-w-lg py-10 rounded-md shadow-md shadow-gray-600 bg-blend-luminosity-100">
        <h1 className="text-4xl font-bold py-5 ">Sign in</h1>
        <UserForm
          defaultValues={{
            mode: 'signIn',
            email: '',
            password: '',
          }}
        />
      </div>
    </main>
  )
}
