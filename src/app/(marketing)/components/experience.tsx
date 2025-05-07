'use server'
import { getExperiences } from '@/app/queries'
import ExperiencesCard from './experiences-card'
import { SelectWorkModel, WorkSchema } from '@/db/schema/experiences'

const ExperienceSection = async () => {
  const experiences: SelectWorkModel[] = await getExperiences()
  return (
    <div className="flex flex-col space-y-20  px-20 ">
      <h2 id="experiences" className="text-2xl font-bold ">
        Work Experiences:
      </h2>
      {experiences.map((experience) => (
        <ExperiencesCard key={experience.id} {...experience} />
      ))}
    </div>
  )
}
export default ExperienceSection
