import { InferSelectModel } from 'drizzle-orm'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const work = pgTable('work', {
  id: uuid().primaryKey().defaultRandom().unique(),
  imageUrl: varchar('image_url', { length: 255 }),
  publicId: varchar('public_id', { length: 255 }),
  workPosition: varchar('work_position', { length: 255 }),
  workPlace: varchar('work_place', { length: 255 }),
  workDescription: varchar('work_description').array().notNull(),
  workTech: varchar('work_tech').array().notNull(),
  startDate: varchar('start_date', { length: 255 }).notNull(),
  endDate: varchar('end_date', { length: 255 }).notNull(),
})

const baseSchema = createInsertSchema(work, {
  imageUrl: (schema) => schema.nullable().optional(),
  publicId: (schema) => schema.nullable().optional(),
  workPosition: (schema) => schema.min(1),
  workPlace: (schema) => schema.min(1),
  workDescription: () => z.array(z.string().min(1)),
  workTech: () => z.array(z.string().min(1)),
  startDate: (schema) => schema.min(1),
  endDate: (schema) => schema.min(1),
}).pick({
  imageUrl: true,
  workPosition: true,
  workPlace: true,
  workDescription: true,
  workTech: true,
  startDate: true,
  endDate: true,
  publicId: true,
})
export const createWorkSchema = z.object({
  mode: z.literal('create'),
  imageUrl: baseSchema.shape.imageUrl,
  publicId: baseSchema.shape.publicId,
  workPosition: z.string().min(1),
  workPlace: z.string().min(1),
  workDescription: z.array(z.object({ value: z.string().min(1) })),
  workTech: z.array(z.object({ value: z.string().min(1) })),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
})
export const insertWorkSchema = z.object({
  mode: z.literal('create'),
  imageUrl: baseSchema.shape.imageUrl,
  publicId: baseSchema.shape.publicId,
  workPosition: baseSchema.shape.workPosition,
  workPlace: baseSchema.shape.workPlace,
  workDescription: baseSchema.shape.workDescription,
  workTech: baseSchema.shape.workDescription,
  startDate: baseSchema.shape.startDate,
  endDate: baseSchema.shape.endDate,
})
export const updatetWorkSchema = z.object({
  mode: z.literal('edit'),
  id: z.string().min(1),
  imageUrl: baseSchema.shape.imageUrl,
  publicId: baseSchema.shape.publicId,
  workPosition: baseSchema.shape.workPosition,
  workPlace: baseSchema.shape.workPlace,
  workDescription: baseSchema.shape.workDescription,
  workTech: baseSchema.shape.workDescription,
  startDate: baseSchema.shape.startDate,
  endDate: baseSchema.shape.endDate,
})

export const editWorkSchema = z.object({
  mode: z.literal('edit'),
  id: z.string().min(1),
  imageUrl: baseSchema.shape.imageUrl,
  publicId: baseSchema.shape.publicId,
  workPosition: baseSchema.shape.workPosition,
  workPlace: baseSchema.shape.workPlace,
  workDescription: z.array(z.object({ value: z.string().min(1) })),
  workTech: z.array(z.object({ value: z.string().min(1) })),
  startDate: baseSchema.shape.startDate,
  endDate: baseSchema.shape.endDate,
})

export const deleteWorkSchema = z.object({
  mode: z.literal('delete'),
  id: z.string().min(1),
  publicId: baseSchema.shape.publicId,
})

// Keep this for shared backend validation
export const workSchema = z.union([
  createWorkSchema,
  editWorkSchema,
  deleteWorkSchema,
])
export type WorkSchema = z.infer<typeof workSchema>
export type InsertWork = z.infer<typeof insertWorkSchema>
export type UpdateWork = z.infer<typeof updatetWorkSchema>
export type SelectWorkModel = InferSelectModel<typeof work>
