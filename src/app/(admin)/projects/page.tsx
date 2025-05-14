import { getExperiences, getProjects, getUserwithData } from '@/app/queries'
import ExperiencesForm from './_components/projects-form'
import ProjectTable from './_components/projects-table'

export default async function UserPage() {
  const projects = await getProjects()
  return (
    <div className="flex flex-col space-y-5 items-center">
      <div className="text-center font-extrabold text-3xl">Project Form</div>
      <ProjectTable data={projects} />
    </div>
  )
}
