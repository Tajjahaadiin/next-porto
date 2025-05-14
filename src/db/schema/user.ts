import { InferSelectModel } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
export const user = pgTable('user', {
  id: uuid().primaryKey().defaultRandom().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  nickname: varchar('surname', { length: 255 }).notNull(),
  shortDescription: varchar('short_description', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  description: text('description').notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  avatarPublicId: varchar('avatar_public_id', { length: 255 }),
  isAvailable: boolean('is_available').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

const baseSchema = createInsertSchema(user, {
  email: (schema) => schema.min(1),
  password: (schema) => schema.min(1),
  nickname: (schema) => schema.min(1),
  shortDescription: (schema) => schema.min(1),
  location: (schema) => schema.min(1),
  description: (schema) => schema.min(1),
  avatarUrl: (schema) => schema.min(1),
  avatarPublicId: (schema) => schema.min(1),
}).pick({
  email: true,
  password: true,
  nickname: true,
  shortDescription: true,
  location: true,
  description: true,
  avatarUrl: true,
  avatarPublicId: true,
  isAvailable: true,
})

export const userSchema = z.union([
  z.object({
    mode: z.literal('signIn'),
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
  }),
  z.object({
    mode: z.literal('update'),
    nickname: baseSchema.shape.nickname,
    shortDescription: baseSchema.shape.shortDescription,
    location: baseSchema.shape.location,
    description: baseSchema.shape.description,
    avatarUrl: baseSchema.shape.avatarUrl,
    avatarPublicId: baseSchema.shape.avatarPublicId,
    isAvailable: baseSchema.shape.isAvailable,
    id: z.string().min(1),
  }),
  z.object({
    mode: z.literal('create'),
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
    nickname: baseSchema.shape.nickname,
    shortDescription: baseSchema.shape.shortDescription,
    location: baseSchema.shape.location,
    description: baseSchema.shape.description,
    avatarUrl: baseSchema.shape.avatarUrl,
    avatarPublicId: baseSchema.shape.avatarPublicId,
    isAvailable: baseSchema.shape.isAvailable,
  }),
])
export type UserSchema = z.infer<typeof userSchema>
export type UserSchemaInput = z.infer<typeof userSchema> & {
  imageFile?: FileList | null
}
export type SelectUserModel = InferSelectModel<typeof user>
