import { getExperiences, getUserwithData } from '@/app/queries'
import ExperiencesForm from './create/_components/create-experiences-form'
import ExperiencesTable from './_components/experiences-table'

export default async function UserPage() {
  const experiences = await getExperiences()
  return (
    <div className="flex flex-col space-y-5 items-center">
      <div className="text-center font-extrabold text-3xl">
        Work Experiences Form
      </div>
      <ExperiencesTable workData={experiences} />
    </div>
  )
}
