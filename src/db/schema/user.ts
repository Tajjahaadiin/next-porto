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
  image: varchar('image', { length: 255 }).notNull(),
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
  image: (schema) => schema.min(1),
  isAvailable: (schema) => schema.default(true),
}).pick({
  email: true,
  password: true,
  nickname: true,
  shortDescription: true,
  location: true,
  description: true,
  image: true,
  isAvailable: true,
})

export const userSchema = z.union([
  z.object({
    mode: z.literal('logIn'),
    email: baseSchema.shape.email,
    password: baseSchema.shape.password,
  }),
  z.object({
    mode: z.literal('update'),
    nickname: baseSchema.shape.nickname,
    shortDescription: baseSchema.shape.shortDescription,
    location: baseSchema.shape.location,
    description: baseSchema.shape.description,
    image: baseSchema.shape.image,
    isAvailable: baseSchema.shape.isAvailable,
  }),
])
export type UserSchema = z.infer<typeof userSchema>
export type SelectUserModel = InferSelectModel<typeof user>
