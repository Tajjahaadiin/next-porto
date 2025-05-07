import { getProjects } from '@/app/queries'
import { ExternalLink, Github } from 'lucide-react'

const ProjectsSection = async () => {
  const projects = await getProjects()
  return (
    <div className="mb-32">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">My Projects:</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {(await projects).map((project) => (
          <div
            key={project.projectName}
            className="bg-bone dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors hover:shadow-xl"
          >
            <div className="relative h-52 flex items-center justify-center bg-gray-100 dark:bg-gray-700 ">
              <img
                src={project.imageUrl}
                alt="Fakturly"
                className="w-full h-full object-contain group-hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-semibold text-xl mb-3">
                {project.projectName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techList?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-400 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-100 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {!project.repoUrl || project.repoUrl === '' ? (
                  <span className="inline-flex items-center px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                    Private Repository
                  </span>
                ) : (
                  <a
                    href={project.repoUrl || ''}
                    target="_blank"
                    className="inline-flex items-center px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <span className="flex items-center justify-center rounded-full bg-blue-600 mr-1 p-0.5 ">
                      <Github className="size-3 text-white font-extrabold" />
                    </span>
                    View on GitHub
                  </a>
                )}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="inline-flex gap-1 items-center px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    <span> Live Demo</span>
                  </a>
                ) : (
                  <a
                    href="#"
                    target="_blank"
                    className="inline-flex gap-1 items-center px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    <span className=""> Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProjectsSection
