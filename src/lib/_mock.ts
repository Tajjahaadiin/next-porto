import { UpdateWork, WorkSchema } from '@/db/schema/experiences'
import { InserProject, ProjectSchema, UpdateProject } from '@/db/schema/project'
import { TechStackSchema } from '@/db/schema/techstack'

export const mockUserUpdate = () => {
  const data = {
    id: '7164b952-ae27-4011-8df9-8b0c95e5ee18',

    nickname: 'LunaDev',
    shortDescription: 'Passionate UX/UI Designer & Frontend Coder',
    location: 'Bandung, Indonesia',
    description:
      "Hey there! I'm a creative soul who loves blending design aesthetics with clean code. I'm constantly exploring new ways to build beautiful and user-friendly interfaces. Take a look at my portfolio to see some of the projects I've been working on. Let's connect if you're interested in design systems or frontend development!",
    image: 'luna-profile.png',
    isAvailable: false,
  }
  return data
}
export const mockUpdateWork = () => {
  const data: Omit<Extract<UpdateWork, { mode: 'edit' }>, 'mode'> = {
    id: 'ec3649e3-eea7-4bdd-b469-3ea76e82ecaa',
    startDate: 'October 2030',
    endDate: 'march 2075',
    workPosition: 'Internship Web Developer',
    workPlace: 'Pretzel.corp',
    workDescription: [
      'Develop and landing Page',
      'Collaborate with the team to complete projects on time',
      'Implement new features based on user requirements',
      'optimize application performance and users experience',
    ],
    workTech: ['HTML', 'CSS', 'Javascript'],
    imageUrl: '/no-imageyet',
  }

  return data
}
export const mockUpdateTechstack = () => {
  const data: Omit<Extract<TechStackSchema, { mode: 'edit' }>, 'mode'> = {
    id: 'e4c7cfd6-35c6-4b1c-9e4b-d3bf855a83a6',
    techName: 'C#',
    techUrl: '/techstack/C#',
  }

  return data
}
export const mockUpdateProject = () => {
  const data: Omit<Extract<UpdateProject, { mode: 'edit' }>, 'mode'> = {
    id: '0b486ad1-2563-4376-98be-82776f1a548d',
    imageUrl: '/circle.png',
    projectName: 'Circle App',
    description:
      'A streamlined social media application built with Next.js, TypeScript, Node.js, and Tailwind CSS. This simplified Twitter clone allows users to create and engage with threads, like and comment on posts, and customize their profiles.',
    techList: ['react.js', 'TypeScript', 'chakra-ui', 'express.js'],
    demoUrl: 'https://foundation-circle.vercel.app/',
    repoUrl: '',
  }

  return data
}
