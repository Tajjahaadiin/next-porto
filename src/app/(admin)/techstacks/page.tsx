import { getUserwithData } from '@/app/queries'
import UserForm from './_components/techs-form'
import { getTechstacks } from '@/app/queries'
import TechTable from './_components/tech-table'

export default async function UserPage() {
  const techstack = await getTechstacks()
  return (
    <div className="flex flex-col  space-y-5 items-center">
      <div className="text-center font-extrabold text-3xl">Tech Form</div>
      <TechTable data={techstack} />
    </div>
  )
}
