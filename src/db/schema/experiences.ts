import { InferSelectModel } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const work = pgTable('work', {
  id: uuid().primaryKey().defaultRandom().unique(),
  ImageUrl: varchar('image_url', { length: 255 }),
  workPosition: varchar('work_position', { length: 255 }),
  workPlace: varchar('work_place', { length: 255 }),
  workDescription: varchar('work_description').array().notNull(),
  workTech: varchar('work_tech').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

const baseSchema = createInsertSchema(work, {
  ImageUrl: (schema) => schema.min(1),
  workPosition: (schema) => schema.min(1),
  workPlace: (schema) => schema.min(1),
  workDescription: (schema) => schema.min(1),
  workTech: (schema) => schema.min(1),
}).pick({
  ImageUrl: true,
  workPosition: true,
  workPlace: true,
  workDescription: true,
  workTech: true,
})
export const workSchema = z.union([
  z.object({
    mode: z.literal('create'),
    ImageUrl: baseSchema.shape.ImageUrl,
    workPosition: baseSchema.shape.workPosition,
    workPlace: baseSchema.shape.workPlace,
    workDescription: baseSchema.shape.workDescription,
    workTech: baseSchema.shape.workTech,
  }),
  z.object({
    mode: z.literal('edit'),
    id: z.string().min(1),
    ImageUrl: baseSchema.shape.ImageUrl,
    workPosition: baseSchema.shape.workPosition,
    workPlace: baseSchema.shape.workPlace,
    workDescription: baseSchema.shape.workDescription,
    workTech: baseSchema.shape.workTech,
  }),
])
export type WorkSchema = z.infer<typeof workSchema>
export type SelectWorkModel = InferSelectModel<typeof work>
