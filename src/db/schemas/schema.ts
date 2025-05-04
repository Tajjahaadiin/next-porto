import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  boolean,
  timestamp,
  text,
  serial,
  integer,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
export const projects = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    projectName: varchar('project_name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    link: text('link'),
    isPrivate: boolean('is_private').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
  },
  (table) => [
    index('index_link').on(table.link),
    index('index_is_private').on(table.isPrivate),
  ]
)

// Define the join table
export const projectTechStack = pgTable(
  'project_tech_stack',
  {
    projectId: integer('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),

    techName: varchar('tech_name', { length: 255 }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.techName] }),
    index('index_tech_name').on(table.techName),
  ]
)

// Define the relationships between tables
export const projectsRelations = relations(projects, ({ many }) => ({
  // A project has many projectTechStack entries
  // The property name 'techStackEntries' will be used in the query result
  techStackEntries: many(projectTechStack),
}))

export const projectTechStackRelations = relations(
  projectTechStack,
  ({ one }) => ({
    // A projectTechStack entry belongs to one project
    project: one(projects, {
      fields: [projectTechStack.projectId], // The local field linking to the other table
      references: [projects.id], // The field in the other table being referenced
    }),
  })
)

// Optional: Type inference from Drizzle schemas - Keep these!
// Note: These base types don't include the relations yet
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type ProjectTechStackEntry = typeof projectTechStack.$inferSelect
export type NewProjectTechStackEntry = typeof projectTechStack.$inferInsert

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

export const moodEnum = pgEnum('mood', ['sad', 'ok', 'happy'])

export const table = pgTable('table', {
  mood: moodEnum(),
  testArray: varchar('testArray', { length: 255 })
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  tags1: text('tags1')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  tags2: text('tags2')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
})
export type NewTestArray = typeof table.$inferInsert
