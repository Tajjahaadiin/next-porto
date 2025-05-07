'use client'
import { Input } from '@/components/form-controllers/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TechStackSchema, techStackSchema } from '@/db/schema/techstack'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { createTechStack, deleteTechStack, updateTechStack } from '../actions'
type Props = {
  defaultValues?: TechStackSchema
  onCloseModal: () => void
}
export default function TechForm({ defaultValues, onCloseModal }: Props) {
  const form = useForm<TechStackSchema>({
    resolver: zodResolver(techStackSchema),
    defaultValues,
  })
  const mode = useWatch({ control: form.control, name: 'mode' })
  const router = useRouter()
  const onSubmit: SubmitHandler<TechStackSchema> = async (data) => {
    let response
    switch (data.mode) {
      case 'create':
        response = await createTechStack(data)
        break
      case 'edit':
        response = await updateTechStack(data)
        break
      case 'delete':
        response = await deleteTechStack(data)
        break
    }

    toast(response)
    console.log(data)
    if (response.success) {
      router.push('/techstacks')
    }
    onCloseModal()
  }
  return (
    <div className={cn('grid gap-4 py-4 className="text-wrap max-w-[375px]" ')}>
      <div className={cn('grid grid-cols-4 items-center gap-4 min-w-full')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-w-[375px] space-y-3"
          >
            {mode === 'edit' && (
              <>
                <Input
                  control={form.control}
                  name="techName"
                  label="Techology Name"
                  type="text"
                  className="border-gray-800"
                />

                <Input
                  control={form.control}
                  name="techUrl"
                  label="Techology Url"
                  type="text"
                  className="border-gray-800"
                />
              </>
            )}
            {mode === 'create' && (
              <>
                <Input
                  control={form.control}
                  name="techName"
                  label="Techology Name"
                  type="text"
                  className="border-gray-800"
                />

                <Input
                  control={form.control}
                  name="techUrl"
                  label="Techology Url"
                  type="text"
                  className="border-gray-800"
                />
              </>
            )}
            {mode === 'delete' && (
              <div>
                <h2 className="text-lg text-red-500">
                  Do you want to continue
                </h2>
              </div>
            )}
            {mode === 'delete' ? (
              <>
                <Button
                  type="submit"
                  variant={'destructive'}
                  className="flex justify-self-end"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  className="flex justify-self-end"
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
