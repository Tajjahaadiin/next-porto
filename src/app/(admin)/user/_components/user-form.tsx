'use client'
import { cn } from '@/lib/utils'
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
import { UserSchema, userSchema } from '@/db/schema/user'
import { toast } from '@/providers/toast-providers'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { updateUser } from '../actions'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/app/_components/form-controllers'
import { useState } from 'react'
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/app/actions/cloudinary'
type Props = {
  defaultValues: UserSchema
}
export default function UserForm({ defaultValues }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })
  const router = useRouter()
  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    let response
    if (data.mode !== 'update') {
      return
    }
    // 1. Upload image if selected
    if (selectedFile) {
      // Delete old image if exists
      if (data.avatarPublicId) {
        await deleteImageFromCloudinary(data.avatarPublicId)
      }

      const uploadResult = await uploadImageToCloudinary(selectedFile, {
        folder: 'user_avatars',
      })

      if (uploadResult.secure_url && uploadResult.public_id) {
        data.avatarUrl = uploadResult.secure_url
        data.avatarPublicId = uploadResult.public_id
      } else {
        toast({ success: false, message: 'Image upload failed' })
        return
      }
    }

    const { mode, id, ...restOfData } = data

    response = await updateUser({ id, ...restOfData })

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
        ' border-1 rounded-md shadow-lg/45 shadow-gray-500 border-gray-400 mb-10'
      )}
    >
      <div className={cn('p-20')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-full min-w-80 space-y-6"
          >
            {mode === 'update' && (
              <>
                <Input
                  control={form.control}
                  name="nickname"
                  label="Nickname"
                  type="text"
                  className="border-gray-800"
                />

                <Input
                  control={form.control}
                  name="shortDescription"
                  label="ShortDescription"
                  type="text"
                  className="border-gray-800"
                />
                <Input
                  control={form.control}
                  name="location"
                  label="Location"
                  type="text"
                  className="border-gray-800"
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>{' '}
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi lengkap Anda di sini..." // Contoh placeholder
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />{' '}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="airplane-mode">
                            Available for hire
                          </Label>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />{' '}
                    </FormItem>
                  )}
                />
              </>
            )}

            <ImageUpload
              initialUrl={form.getValues('avatarUrl') || ''}
              onFileSelect={setSelectedFile}
            />
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
    </div>
  )
}
