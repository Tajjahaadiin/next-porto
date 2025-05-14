import { InferSelectModel } from 'drizzle-orm'
import { pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const project = pgTable('project', {
  id: uuid().primaryKey().defaultRandom().unique(),
  imageUrl: varchar('image_url', { length: 255 }),
  publicId: varchar('public_id', { length: 255 }),
  projectName: varchar('project_name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  techList: varchar('techlist').array(),
  repoUrl: varchar('repo_url', { length: 255 }),
  demoUrl: varchar('demo_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

const baseSchema = createInsertSchema(project, {
  id: (schema) => schema.min(1),
  imageUrl: (schema) => schema.optional(),
  projectName: (schema) => schema.min(1),
  description: (schema) => schema.min(1),
  techList: (schema) => schema.min(1),
  demoUrl: (schema) => schema.optional(),
  repoUrl: (schema) => schema.optional(),
}).pick({
  id: true,
  imageUrl: true,
  projectName: true,
  description: true,
  techList: true,
  demoUrl: true,
  repoUrl: true,
  publicId: true,
})
export const insertProjectSchema = z.object({
  mode: z.literal('create'),
  imageUrl: baseSchema.shape.imageUrl,
  projectName: baseSchema.shape.projectName,
  description: baseSchema.shape.description,
  techList: baseSchema.shape.techList,
  demoUrl: baseSchema.shape.demoUrl,
  repoUrl: baseSchema.shape.repoUrl,
  publicId: baseSchema.shape.publicId,
})
export const updateProjectSchema = z.object({
  mode: z.literal('edit'),
  id: baseSchema.shape.id,
  imageUrl: baseSchema.shape.imageUrl,
  projectName: baseSchema.shape.projectName,
  description: baseSchema.shape.description,
  techList: baseSchema.shape.techList,
  demoUrl: baseSchema.shape.demoUrl,
  repoUrl: baseSchema.shape.repoUrl,
  publicId: baseSchema.shape.publicId,
})
export const projectSchema = z.union([
  z.object({
    mode: z.literal('create'),
    imageUrl: baseSchema.shape.imageUrl,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: z.array(z.object({ value: z.string().min(1) })),
    demoUrl: baseSchema.shape.demoUrl,
    repoUrl: baseSchema.shape.repoUrl,
    publicId: baseSchema.shape.publicId,
  }),
  z.object({
    mode: z.literal('edit'),
    id: z.string().min(1),
    imageUrl: baseSchema.shape.imageUrl,
    publicId: baseSchema.shape.publicId,
    projectName: baseSchema.shape.projectName,
    description: baseSchema.shape.description,
    techList: z.array(z.object({ value: z.string().min(1) })),
    demoUrl: baseSchema.shape.demoUrl,
    repoUrl: baseSchema.shape.repoUrl,
  }),
  z.object({
    mode: z.literal('delete'),
    id: z.string().min(1),
    publicId: baseSchema.shape.publicId,
  }),
])

export type UpdateProject = z.infer<typeof updateProjectSchema>
export type InserProject = z.infer<typeof insertProjectSchema>
export type ProjectSchema = z.infer<typeof projectSchema>
export type SelectProjectModel = InferSelectModel<typeof project>
