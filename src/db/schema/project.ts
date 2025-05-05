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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

const baseSchema = createInsertSchema(project, {
  imageUrl: (schema) => schema.min(1),
  projectName: (schema) => schema.min(1),
  description: (schema) => schema.min(1),
  techList: (schema) => schema.min(1),
}).pick({
  imageUrl: true,
  projectName: true,
  description: true,
  techList: true,
})
export const projectSchema = z.union([
  z.object({
    mode: z.literal('create'),
    imageUrl: baseSchema.shape.imageUrl,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: baseSchema.shape.techList,
  }),
  z.object({
    mode: z.literal('edit'),
    id: z.string().min(1),
    imageUrl: baseSchema.shape.imageUrl,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: baseSchema.shape.techList,
  }),
])
export type ProjectSchema = z.infer<typeof projectSchema>
export type SelectProjectModel = InferSelectModel<typeof project>
