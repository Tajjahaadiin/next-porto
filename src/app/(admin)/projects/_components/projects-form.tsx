'use client'
import { ImageUpload } from '@/app/_components/form-controllers'
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/app/actions/cloudinary'
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
import { Textarea } from '@/components/ui/textarea'
import { projectSchema, ProjectSchema } from '@/db/schema/project'
import { cn } from '@/lib/utils'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleMinusIcon, HelpCircleIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form'
import { createProject, deleteProject, updateProject } from '../actions'
type Props = {
  defaultValues: ProjectSchema

  onCloseModal: () => void
}
export default function ProjectForm({ defaultValues, onCloseModal }: Props) {
  const MAX_TECH = 6
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })
  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray<ProjectSchema, 'techList'>({
    control: form.control,
    name: 'techList',
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<ProjectSchema> = async (data) => {
    let response
    switch (data.mode) {
      case 'create':
        {
          if (selectedFile) {
            const uploadResult = await uploadImageToCloudinary(selectedFile, {
              folder: 'project',
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
            techList: data.techList.map((proj) => proj.value),
          }
          response = await createProject({ ...transformedData })
        }
        break
      case 'edit':
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
            folder: 'project',
          })
          if (uploadResult.secure_url && uploadResult.public_id) {
            data.imageUrl = uploadResult.secure_url
            data.publicId = uploadResult.public_id
          } else {
            toast({ success: false, message: 'Image upload failed' })
            return
          }
          const transformedData = {
            ...data,
            techList: data.techList.map((proj) => proj.value),
          }
          response = await updateProject({ ...transformedData })
        }
        break
      case 'delete':
        {
          if (!data.id) {
            throw new Error('something went wrong')
          }
          response = await deleteProject(data)
          if (data.publicId) {
            if (data.publicId) {
              await deleteImageFromCloudinary(data.publicId)
            }
          }
        }
        break
    }

    toast(response)
    // console.log(data)
    if (response?.success) {
      router.push('/projects')
    }
    onCloseModal()
  }
  return (
    <div className={cn('flex flex-col')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.error('form validation errors:', errors)
          })}
          className=" space-y-6"
        >
          {(mode === 'create' || mode === 'edit') && (
            <>
              <Input
                control={form.control}
                name="projectName"
                label="Project Name"
                type="text"
                className="border-gray-800"
              />
              <FormField
                control={form.control}
                name={`description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Description`}</FormLabel>{' '}
                    <FormControl>
                      <Textarea
                        placeholder="input yout your description here..."
                        className=" resize-none "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input
                control={form.control}
                name="repoUrl"
                label="Repo Url"
                type="text"
                className="border-gray-800"
              />
              <Input
                control={form.control}
                name="demoUrl"
                label="Demo Url"
                type="text"
                className="border-gray-800"
              />
              <div className="">
                <p className="">Image Url</p>
                <ImageUpload
                  onFileSelect={setSelectedFile}
                  initialUrl={form.getValues('imageUrl') || ''}
                />
              </div>
              <div className="flex flex-col  space-y-5">
                {techFields.map((field, index) => (
                  <div className="flex gap-5" key={index}>
                    <div
                      key={field.id}
                      className="flex-11/12  items-end space-x-5"
                    >
                      <Input
                        control={form.control}
                        name={`techList.${index}.value`}
                        label={`Tech ${index + 1}`}
                        type="text"
                        className="border-gray-800  "
                      />
                    </div>
                    <div className="flex-initial" key={index}>
                      <Button
                        type="button"
                        variant={'remove'}
                        onClick={() => removeTech(index)}
                        className="text-red-500 mt-5"
                      >
                        <CircleMinusIcon className="size-5" />
                      </Button>
                    </div>
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
  )
}
