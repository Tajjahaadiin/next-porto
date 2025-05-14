import { DB } from '@/db'
import { project, ProjectSchema } from '@/db/schema/project'

const mockProjects: Omit<Extract<ProjectSchema, { mode: 'create' }>, 'mode'>[] =
  [
    {
      imageUrl: '/circle.png',
      publicId: '',
      projectName: 'Circle App',
      description:
        'A streamlined social media application built with Next.js, TypeScript, Node.js, and Tailwind CSS. This simplified Twitter clone allows users to create and engage with threads, like and comment on posts, and customize their profiles.',
      techList: ['react.js', 'TypeScript', 'chakra-ui', 'express.js'],
      demoUrl: 'https://foundation-circle.vercel.app/',
      repoUrl: '',
    },
    {
      imageUrl: '/issuetracking.png',
      publicId: '',
      projectName: 'Mode',
      description:
        'Introducing Mode, an efficient issue tracking solution developed with Next.js, TypeScript, Node.js, and styled using Tailwind CSS. Inspired by Linear, Mode offers a focused approach to task management, bug tracking, and project workflow.',
      techList: ['Next.js', 'Neon', 'Shadcn', 'PostgreSQL'],
      repoUrl: '',
      demoUrl: '',
    },
    // Add more dummy data here
  ]

const mock = () => {
  const data: Omit<Extract<ProjectSchema, { mode: 'create' }>, 'mode'>[] = []
  for (const value of mockProjects) {
    data.push({
      imageUrl: value.imageUrl,
      publicId: value.publicId,
      projectName: value.projectName,
      description: value.description,
      techList: value.techList,
      repoUrl: value.repoUrl,
      demoUrl: value.demoUrl,
    })
  }

  return data
}

export async function seed(db: DB) {
  await db.insert(project).values(mock())
}
