'use server'
import { getUserwithData } from '@/app/queries'
import TextContent from './components/content'
import ExperienceSection from './components/experience'
import ProjectsSection from './components/projects'
import { MarqueeDemo } from './components/techstack'
export default async function HomePage() {
  const content = await getUserwithData()

  return (
    <div className="min-w-screen">
      <div id="hero" className="grid grid-cols-1 justify-center mt-50   ">
        <TextContent {...content} />
      </div>
      <div id="techstack" className="px-30 mb-20">
        <MarqueeDemo />
      </div>
      <div>
        <ExperienceSection />
      </div>
      <div id="projects" className="px-30 mb-20 mt-20">
        <ProjectsSection />
      </div>
    </div>
  )
}
