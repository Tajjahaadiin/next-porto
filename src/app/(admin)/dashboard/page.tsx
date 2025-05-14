import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { redirect } from 'next/dist/client/components/redirect'

export default async function DashboardPage() {
  const session = await auth()
  console.log(session)
  if (!session?.user) return redirect('/sign-in')
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-5xl font-extrabold">Dashboard</h1>
        <div
          className={cn(
            'border-2 border-gray-600   dark:border-white ',
            'rounded-md  min-h-30 max-w-xl p-10 ',
            'shadow-lg/90 shadow-gray-500'
          )}
        >
          <p className="text-lg text-wrap">
            Welcome to Dashboard!!!. this page allow you to edit and customize
            your profile to meet your need.
          </p>
        </div>
      </div>
    </div>
  )
}
