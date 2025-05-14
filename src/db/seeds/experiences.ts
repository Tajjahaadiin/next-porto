import { DB } from '@/db'
import { InsertWork, work } from '@/db/schema/experiences'
const experiences: Omit<Extract<InsertWork, { mode: 'create' }>, 'mode'>[] = [
  {
    startDate: 'October 2022',
    endDate: 'march 2023',
    workPosition: 'Internship Web Developer',
    workPlace: 'Putra Winata',
    workDescription: [
      'Develop and landing Page',
      'Collaborate with the team to complete projects on time',
      'Implement new features based on user requirements',
      'optimize application performance and users experience',
    ],
    workTech: ['HTML', 'CSS', 'Javascript'],
    imageUrl: '/putrawinata-logo.png',
    publicId: '',
  },
  {
    startDate: 'Oct 2023',
    endDate: '0ct 2024',
    workPosition: 'Junior Developer',
    workPlace: 'Putra Winata',
    workDescription: [
      'Develop and Web Expo',
      'Collaborate with the team to complete projects on time',
      'Implement Gamification features based on user requirements',
      'optimize application performance and users experience',
    ],
    workTech: ['C#', 'Javascript', 'Unity', 'Playcanvas', 'WebGl'],
    imageUrl: '/nickystudio.png',
    publicId: '',
  },
]
const mock = () => {
  const data: Omit<Extract<InsertWork, { mode: 'create' }>, 'mode'>[] = []

  for (const value of experiences) {
    data.push({
      startDate: value.startDate,
      endDate: value.endDate,
      workPosition: value.workPosition,
      workPlace: value.workPlace,
      workDescription: value.workDescription,
      workTech: value.workTech,
      imageUrl: value.imageUrl,
      publicId: value.publicId,
    })
  }
  return data
}
export async function seed(db: DB) {
  await db.insert(work).values(mock())
}
