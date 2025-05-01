import { z } from 'zod'

export const contentFormSchema = z.object({
  surname: z
    .string()
    .min(2, { message: 'Surename must be at least 2 characters.' }),
  motto: z.string().min(3, { message: 'Motto must be at least 3 characters.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters.' }),
  isAvailable: z.boolean().default(true),
  image: z.string().optional(),
})

// Type for the form values
export type ContentFormValues = z.infer<typeof contentFormSchema>
