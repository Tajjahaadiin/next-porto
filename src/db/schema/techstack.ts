import { InferSelectModel } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const techstack = pgTable('techstack', {
  id: uuid().primaryKey().defaultRandom().unique(),
  techName: varchar('tech_name', { length: 255 }).notNull(),
  techUrl: varchar('tech_url', { length: 255 }),
  publicId: varchar('public_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
const baseSchema = createInsertSchema(techstack, {
  techName: (schema) => schema.min(1),
  techUrl: (schema) => schema.nullable().optional(),
  publicId: (schema) => schema.nullable().optional(),
}).pick({
  techName: true,
  techUrl: true,
  publicId: true,
})

export const techStackSchema = z.union([
  z.object({
    mode: z.literal('create'),
    techName: baseSchema.shape.techName,
    techUrl: baseSchema.shape.techUrl,
    publicId: baseSchema.shape.publicId,
  }),
  z.object({
    mode: z.literal('edit'),
    id: z.string(),
    techName: baseSchema.shape.techName,
    techUrl: baseSchema.shape.techUrl,
    publicId: baseSchema.shape.publicId,
  }),
  z.object({
    mode: z.literal('delete'),
    id: z.string().min(1),
    publicId: baseSchema.shape.publicId,
  }),
])

export type TechStackSchema = z.infer<typeof techStackSchema>
export type SelectTechstackModel = InferSelectModel<typeof techstack>
