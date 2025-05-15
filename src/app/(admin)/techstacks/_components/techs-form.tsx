'use client'
import { ImageUpload } from '@/app/_components/form-controllers'
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/app/actions/cloudinary'
import { Input } from '@/components/form-controllers/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TechStackSchema, techStackSchema } from '@/db/schema/techstack'
import { UserSchema } from '@/db/schema/user'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { HelpCircleIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { createTechStack, deleteTechStack, updateTechStack } from '../actions'
import router from 'next/router'
import { redirect } from 'next/navigation'
type Props = {
  defaultValues?: TechStackSchema
  onCloseModal: () => void
}

export default function TechForm({ defaultValues, onCloseModal }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<TechStackSchema>({
    resolver: zodResolver(techStackSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })

  const onSubmit: SubmitHandler<TechStackSchema> = async (data) => {
    let response
    switch (data.mode) {
      case 'create':
        {
          if (!selectedFile || null) {
            new Promise((resolve) => {
              toast({ success: false, message: 'Image connot be empty ' })
              setTimeout(resolve, 5000)
            }).finally(() => {
              throw new Error('image cannot be empty')
            })
          }
          if (selectedFile) {
            const uploadResult = await uploadImageToCloudinary(selectedFile, {
              folder: 'techstack',
            })
            if (uploadResult.secure_url && uploadResult.public_id) {
              data.techUrl = uploadResult.secure_url
              data.publicId = uploadResult.public_id
            } else {
              toast({ success: false, message: 'Image upload failed' })
              return
            }
          }
          const { mode, ...restOfData } = data
          response = await createTechStack({ ...restOfData })
        }
        break
      case 'edit':
        {
          if (!selectedFile || null) {
            new Promise((resolve) => {
              toast({ success: false, message: 'Image connot be empty ' })
              setTimeout(resolve, 5000)
            }).finally(() => {
              throw new Error('image cannot be empty')
            })
          }
          if (data.publicId) {
            await deleteImageFromCloudinary(data.publicId)
          }
          if (selectedFile) {
            const uploadResult = await uploadImageToCloudinary(selectedFile, {
              folder: 'techstack',
            })
            if (uploadResult.secure_url && uploadResult.public_id) {
              data.techUrl = uploadResult.secure_url
              data.publicId = uploadResult.public_id
            } else {
              toast({ success: false, message: 'Image upload failed' })
              return
            }
          }
          const { mode, ...restOfData } = data
          response = await updateTechStack({ ...restOfData })
        }
        break
      case 'delete': {
        response = await deleteTechStack(data)
        if (data.publicId) {
          await deleteImageFromCloudinary(data.publicId)
        }
        console.log('delete')
        break
      }
    }
    onCloseModal()
    if (response?.success == true) {
      redirect('/techstacks')
    }
    toast(response)
  }
  return (
    <div
      className={cn('grid gap-4 py-4  className="text-wrap max-w-[375px]" ')}
    >
      <div className={cn('grid grid-cols-4 items-center gap-4 min-w-full')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-w-[375px] space-y-3"
          >
            {(mode === 'create' || mode === 'edit') && (
              <>
                <Input
                  control={form.control}
                  name="techName"
                  label="tech name"
                />
                <ImageUpload
                  onFileSelect={setSelectedFile}
                  initialUrl={form.getValues('techUrl') || ''}
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
                <div className="flex justify-center items-center">
                  <HelpCircleIcon className="size-25 text-destructive" />
                </div>
                <h2 className="text-center text-gray-600">
                  Do You want to delete this data???
                </h2>

                <div className="flex justify-center gap-5 ">
                  <Button
                    variant={'default'}
                    type="button"
                    onClick={onCloseModal}
                  >
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
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
