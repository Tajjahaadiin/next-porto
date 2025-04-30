import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

export const profile = pgTable('profile', {
  uuid: uuid().defaultRandom().primaryKey().notNull(),
  surname: varchar({ length: 255 }).default('Tajj').notNull(),
  motto: varchar({ length: 255 })
    .default('Aspiring Fullstack Developer')
    .notNull(),
  location: varchar({ length: 255 })
    .default('Depok Sawangan, Indonesia')
    .notNull(),
  content: text().default('So glad you stopped by!...').notNull(),
  image: varchar({ length: 255 }).default('globe.svg').notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})
