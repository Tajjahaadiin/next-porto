import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  text,
  serial,
} from 'drizzle-orm/pg-core'

export const profileTable = pgTable('profile', {
  uuid: uuid().primaryKey().defaultRandom().unique(),
  surname: varchar('surname', { length: 255 }).notNull().default('Tajj'),
  motto: varchar('motto', { length: 255 })
    .notNull()
    .default('Aspiring Fullstack Developer'),
  location: varchar('location', { length: 255 })
    .notNull()
    .default('Depok Sawangan, Indonesia'),
  content: text('content').notNull().default('So glad you stopped by!...'),
  image: varchar('image', { length: 255 }).notNull().default('globe.svg'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
export const technologies = pgTable('technologies', {
  id: serial('id').primaryKey(),
  techName: varchar('techName', { length: 255 }).notNull(),
  imageUrl: text('imageUrl').notNull(),
})
export type Technology = typeof technologies.$inferSelect // Type for selecting data
export type NewTechnology = typeof technologies.$inferInsert // Type for inserting data
