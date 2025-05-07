import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmailAndPassword } from '@/app/sign-in/queries'
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const dbUser = await getUserByEmailAndPassword(credentials)
        if (!dbUser) {
          throw new Error('User not found / Wrong credentials')
        }
        return { ...dbUser, id: dbUser.id }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      //@ts-expect-error session have differrent shape then string
      session.user.id = token.id
      return session
    },
  },
})
