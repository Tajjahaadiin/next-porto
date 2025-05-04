export interface Project {
  imageUrl: string
  projectName: string
  description: string
  techStack: string[] // This is the array we need to represent in the DB
  link: string
  isPrivate: boolean
}

export type ProjectList = Project[]
