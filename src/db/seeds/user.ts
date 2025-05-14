import { DB } from '@/db'
import { user, UserSchema } from '@/db/schema/user'

const mock = () => {
  const data: Omit<Extract<UserSchema, { mode: 'create' }>, 'mode'>[] = []

  data.push({
    email: 'adinada001@gmail.com',
    password: '1234',
    description: `So glad you stopped by! I'm an enthusiastic aspiring React developer eager to create intuitive and enjoyable web experiences. I'm excited to share my work with you! Explore my projects to see how I'm putting my React skills into practice. Feel free to connect and say hello!`,
    avatarUrl:
      'https://res.cloudinary.com/ddx1xhkza/image/upload/v1746674894/user_avatars/h00pwkimsnbku0xp5ycq.jpg',
    avatarPublicId: 'user_avatars/h00pwkimsnbku0xp5ycq',
    isAvailable: true,
    location: 'Depok Sawangan, Indonesia',
    nickname: 'Tajj',
    shortDescription: 'Aspiring Fullstack Developer!',
  })

  return data
}

export async function seed(db: DB) {
  await db.insert(user).values(mock())
}
