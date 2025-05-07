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
type Props = {
  defaultValues: WorkSchema
  descData?: String[]
  techData?: String[]
  onCloseModal: () => void
}
export default function ExperiencesForm({
  defaultValues,
  onCloseModal,
  techData,
  descData,
}: Props) {
  const form = useForm<WorkSchema>({
    resolver: zodResolver(workSchema),
    defaultValues,
  })
  const [workDesc, setWorkDesc] = useState<Array<String>>([])
  const [tech, setTech] = useState<Array<String>>([])
  if (techData) {
    setTech(techData)
  }
  if (descData) {
    setWorkDesc(descData)
  }
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
        'w-3xl h-full',

        'flex flex-col justify-center',
        ' border-1 rounded-md shadow-lg/45 shadow-gray-500 border-gray-400 '
      )}
    >
      <div className={cn('p-20')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-full min-w-80 space-y-6"
          >
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
              label="Location"
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
    </div>
  )
}
