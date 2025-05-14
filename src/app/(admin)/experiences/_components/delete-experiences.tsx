'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { deleteWorkSchema } from '@/db/schema/experiences'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { HelpCircleIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { deleteImageFromCloudinary } from '@/app/actions/cloudinary'
import { z } from 'zod'
import { deleteExperiences } from '../actions'
interface Props {
  defaultValues: DeleteWorkData
  onCloseModal: () => void
}
type DeleteWorkData = z.infer<typeof deleteWorkSchema>
export default function DeleteWorkForm({ defaultValues, onCloseModal }: Props) {
  const form = useForm<DeleteWorkData>({
    resolver: zodResolver(deleteWorkSchema),
    defaultValues,
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<
    Omit<Extract<DeleteWorkData, { mode: 'delete' }>, 'mode'>
  > = async (data) => {
    let response

    response = await deleteExperiences(data)
    if (data.publicId) {
      await deleteImageFromCloudinary(data.publicId)
    }
    if (response?.success == true) {
      router.push('/experiences')
    }
    toast(response)
    onCloseModal()
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
          <div className="flex justify-center items-center">
            <HelpCircleIcon className="size-25 text-destructive" />
          </div>
          <h2 className="text-center text-gray-600">
            Do You want to delete this data???
          </h2>

          <div className="flex justify-center gap-5 ">
            <Button variant={'default'} type="button" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="justify-self-end"
              variant={'destructive'}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
