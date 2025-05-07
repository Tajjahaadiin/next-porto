import { InferSelectModel } from 'drizzle-orm'
import { pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const project = pgTable('project', {
  id: uuid().primaryKey().defaultRandom().unique(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  projectName: varchar('project_name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  techList: varchar('techlist').array(),
  repoUrl: varchar('repo_url', { length: 255 }),
  demoUrl: varchar('demo_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

const baseSchema = createInsertSchema(project, {
  imageUrl: (schema) => schema.min(1),
  projectName: (schema) => schema.min(1),
  description: (schema) => schema.min(1),
  techList: (schema) => schema.min(1),
  demoUrl: (schema) => schema.min(1),
  repoUrl: (schema) => schema.min(1),
}).pick({
  imageUrl: true,
  projectName: true,
  description: true,
  techList: true,
  demoUrl: true,
  repoUrl: true,
})
export const projectSchema = z.union([
  z.object({
    mode: z.literal('create'),
    imageUrl: baseSchema.shape.imageUrl,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: baseSchema.shape.techList,
    demoUrl: baseSchema.shape.demoUrl,
    repoUrl: baseSchema.shape.repoUrl,
  }),
  z.object({
    mode: z.literal('edit'),
    id: z.string().min(1),
    imageUrl: baseSchema.shape.imageUrl,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: baseSchema.shape.techList,
    demoUrl: baseSchema.shape.demoUrl,
    repoUrl: baseSchema.shape.repoUrl,
  }),
])
export type ProjectSchema = z.infer<typeof projectSchema>
export type SelectProjectModel = InferSelectModel<typeof project>
