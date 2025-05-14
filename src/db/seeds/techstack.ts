import { DB } from '@/db'
import { techstack, TechStackSchema } from '@/db/schema/techstack'

const mockTechStack = [
  {
    techName: 'typescript',
    techUrl: '/techstack/typescript.png',
    publicId: 's',
  },
  {
    techName: 'tailwind',
    techUrl: '/techstack/tailwind.png',
    publicId: 's',
  },
  {
    techName: 'postgres',
    techUrl: '/techstack/postgres.png',
    publicId: 's',
  },

  {
    techName: 'nextjs',
    techUrl: '/techstack/next.png',
    publicId: 's',
  },
  {
    techName: 'expressjs',
    techUrl: '/techstack/expressjs.png',
    publicId: 's',
  },
  {
    techName: 'react',
    techUrl: '/techstack/react.png',
    publicId: 's',
  },
]
const mock = () => {
  const data: Omit<Extract<TechStackSchema, { mode: 'create' }>, 'mode'>[] = []

  for (const value of mockTechStack) {
    data.push({
      techName: value.techName,
      techUrl: value.techUrl,
      publicId: value.publicId,
    })
  }
  return data
}
export async function seed(db: DB) {
  await db.insert(techstack).values(mock())
}
