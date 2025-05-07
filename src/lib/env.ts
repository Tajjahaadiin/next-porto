import { z, ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import 'dotenv/config'
const myEnv = config()
expand(myEnv)
console.log('env', process.env.HOST)
const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  NEXT_PUBLIC_DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_TRUST_HOST: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
})

try {
  envSchema.parse(process.env)
} catch (e) {
  if (e instanceof ZodError) {
    console.error('environment validation error', e.errors)
  }
}

export default envSchema.parse(process.env)
