'use client'
import { ImageUpload } from '@/app/_components/form-controllers'
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
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { UserSchema, userSchema } from '@/db/schema/user'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { signIn } from '../actions'
import { toast } from '@/providers/toast-providers'
type Props = {
  defaultValues: UserSchema
}
export default function UserForm({ defaultValues }: Props) {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })
  const router = useRouter()
  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    let response
    if (data.mode !== 'signIn') {
      return
    }
    response = await signIn(data)
    toast(response)
    console.log(response)
    if (response.success === true) {
      router.push('/dashboard')
    }
  }
  return (
    <div className={cn('flex flex-col justify-center')}>
      <div className={cn('p-5')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-full min-w-80 space-y-6"
          >
            {mode === 'signIn' && (
              <>
                <Input
                  control={form.control}
                  name="email"
                  label="Email"
                  type="text"
                  className="border-gray-800"
                />
                <Input
                  control={form.control}
                  name="password"
                  label="password"
                  type="password"
                  className="border-gray-800"
                />
              </>
            )}

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
