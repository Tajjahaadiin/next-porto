import { getUserwithData } from '@/app/queries'

export default async function Page() {
  const user = await getUserwithData()
  return <h1 className="text-9xl text-black">{user.nickname}</h1>
}
