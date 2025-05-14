'use client'
import { ImageUpload } from '@/app/_components/form-controllers'
import { uploadImageToCloudinary } from '@/app/actions/cloudinary'
import { Input } from '@/components/form-controllers/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { editWorkSchema } from '@/db/schema/experiences'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleMinusIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createExperiences, updateExperiences } from '../actions'
import { Textarea } from '@/components/ui/textarea'
interface Props {
  defaultValues: WorkFormData
  oncloseModal: () => void
}
type WorkFormData = z.infer<typeof editWorkSchema>

export default function EditExperiencesForm({
  defaultValues,
  oncloseModal,
}: Props) {
  console.log(defaultValues.imageUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const MAX_DESC = 5
  const MAX_TECH = 6

  const form = useForm<WorkFormData>({
    resolver: zodResolver(editWorkSchema),
    defaultValues,
  })
  const {
    fields: descFields,
    append: appendDesc,
    remove: removeDesc,
  } = useFieldArray<WorkFormData, 'workDescription'>({
    control: form.control,
    name: 'workDescription',
  })
  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray<WorkFormData, 'workTech'>({
    control: form.control,
    name: 'workTech',
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<
    Omit<Extract<WorkFormData, { mode: 'edit' }>, 'mode'>
  > = async (data) => {
    let response
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
        folder: 'experiences',
      })
      if (uploadResult.secure_url && uploadResult.public_id) {
        data.imageUrl = uploadResult.secure_url
        data.publicId = uploadResult.public_id
      } else {
        toast({ success: false, message: 'Image upload failed' })
        return
      }
    }
    const transformedData = {
      ...data,
      workDescription: data.workDescription.map((desc) => desc.value),
      workTech: data.workTech.map((tech) => tech.value),
    }
    response = await updateExperiences({ ...transformedData })
    console.log(transformedData)
    if (response?.success == true) {
      router.push('/experiences')
    }
    toast(response)
    oncloseModal()
  }
  return (
    <div className={cn('flex flex-col ')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.error('form validation errors:', errors)
          })}
          className=" space-y-6"
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
            name="startDate"
            label="Start Date"
            type="text"
            className="border-gray-800"
          />
          <Input
            control={form.control}
            name="endDate"
            label="End Date"
            type="text"
            className="border-gray-800"
          />

          <div className="flex flex-col">
            <p>ImageUrl</p>
            <ImageUpload
              onFileSelect={setSelectedFile}
              initialUrl={form.getValues('imageUrl') || ''}
            />
          </div>
          <div className="flex flex-col space-y-10">
            {descFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-5">
                <FormField
                  control={form.control}
                  name={`workDescription.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Description ${index + 1}`}</FormLabel>{' '}
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi lengkap Anda di sini..." // Contoh placeholder
                          className=" w-[70vw] resize-none "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant={'remove'}
                  onClick={() => removeDesc(index)}
                  className="text-red-500 size-10 mt-5"
                >
                  <CircleMinusIcon className="size-5" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              disabled={descFields.length >= MAX_DESC}
              onClick={() => {
                appendDesc({ value: '' })
              }}
              className="mt-2"
            >
              Add Description
            </Button>
          </div>
          <div className="flex flex-col space-y-5">
            {techFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-5">
                <Input
                  control={form.control}
                  name={`workTech.${index}.value`}
                  label={`Tech ${index + 1}`}
                  type="text"
                  className="border-gray-800 w-[70vw]"
                />
                <Button
                  type="button"
                  variant={'remove'}
                  onClick={() => removeTech(index)}
                  className="text-red-500 mt-5"
                >
                  <CircleMinusIcon className="size-5" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              disabled={techFields.length >= MAX_TECH}
              onClick={() => appendTech({ value: '' })}
              className="mt-2"
            >
              Add Tech
            </Button>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
