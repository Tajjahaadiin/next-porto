import { DB } from '@/db'
import { techstack, TechStackSchema } from '@/db/schema/techstack'

const mockTechStack = [
  {
    techName: 'typescript',
    techUrl: '/techstack/typescript.png',
  },
  {
    techName: 'tailwind',
    techUrl: '/techstack/tailwind.png',
  },
  {
    techName: 'postgres',
    techUrl: '/techstack/postgres.png',
  },

  {
    techName: 'nextjs',
    techUrl: '/techstack/next.png',
  },
  {
    techName: 'expressjs',
    techUrl: '/techstack/expressjs.png',
  },
  {
    techName: 'react',
    techUrl: '/techstack/react.png',
  },
]
const mock = () => {
  const data: Omit<Extract<TechStackSchema, { mode: 'create' }>, 'mode'>[] = []

  for (const value of mockTechStack) {
    data.push({
      techName: value.techName,
      techUrl: value.techUrl,
    })
  }
  return data
}
export async function seed(db: DB) {
  await db.insert(techstack).values(mock())
}
