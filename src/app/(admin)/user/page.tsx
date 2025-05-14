import { getUserwithData } from '@/app/queries'
import UserForm from './_components/user-form'

export default async function UserPage() {
  const user = await getUserwithData()
  return (
    <div className="flex flex-col space-y-5 items-center">
      <div className="text-center font-extrabold text-3xl">User Form</div>
      <UserForm
        defaultValues={{
          mode: 'update',
          id: user.id,
          nickname: user.nickname,
          shortDescription: user.shortDescription,
          description: user.description,
          avatarUrl: user.avatarUrl,
          avatarPublicId: user.avatarPublicId,
          isAvailable: user.isAvailable,
          location: user.location,
        }}
      />
    </div>
  )
}
