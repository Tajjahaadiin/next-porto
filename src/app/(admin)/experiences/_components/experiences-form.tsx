'use client'
import { Input } from '@/components/form-controllers/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { workSchema, WorkSchema } from '@/db/schema/experiences'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import {
  createExperiences,
  deleteExperiences,
  updateExperiences,
} from '../actions'
interface Props {
  defaultValues: WorkSchema

  onCloseModal: () => void
}
export default function ExperiencesForm({
  defaultValues,
  onCloseModal,
}: Props) {
  const form = useForm<WorkSchema>({
    resolver: zodResolver(workSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })
  const router = useRouter()
  const onSubmit: SubmitHandler<WorkSchema> = async (data) => {
    let response
    switch (data.mode) {
      case 'create':
        response = await createExperiences(data)
        break
      case 'edit':
        response = await updateExperiences(data)
        break
      case 'delete':
        response = await deleteExperiences(data)
        break
    }

    toast(response)
    console.log(data)
    if (response.success) {
      router.push('/dashboard')
    }
  }
  return (
    <div
      className={cn(
        'w-[375px] h-full',

        'flex flex-col items-center'
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[375px] min-w-80 space-y-6"
        >
          {mode === 'edit' && (
            <>
              <Input
                control={form.control}
                name="workPlace"
                label="Work Place"
                type="text"
                className="border-gray-800"
              />

              <Input
                control={form.control}
                name="workPosition"
                label="Work Position"
                type="text"
                className="border-gray-800"
              />
              <Input
                control={form.control}
                name="imageUrl"
                hidden
                type="text"
                className="border-gray-800"
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </>
          )}
          {mode === 'create' && (
            <>
              <Input
                control={form.control}
                name="workPlace"
                label="Work Place"
                type="text"
                className="border-gray-800"
              />

              <Input
                control={form.control}
                name="workPosition"
                label="Work Position"
                type="text"
                className="border-gray-800"
              />
              <Input
                control={form.control}
                name="imageUrl"
                hidden
                type="text"
                className="border-gray-800"
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </>
          )}

          {mode === 'delete' && (
            <>
              <h2>Are you sure to delete this</h2>
              <Button
                type="submit"
                variant={'destructive'}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
