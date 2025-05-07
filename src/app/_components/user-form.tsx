import { SubmitHandler, useForm, useWatch } from 'react-hook-form'

// import { updateUser } from "@/app/(admin)/admin/actions";
import { signIn } from '@/app/sign-in/actions'
import { Input } from '@/components/form-controllers/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { UserSchema, userSchema } from '@/db/schema/user'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from '@/components/spinner'

type Props = {
  defaultValues: UserSchema
}

export function UserForm({ defaultValues }: Props) {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  const mode = useWatch({ control: form.control, name: 'mode' })

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    let response
    if (data.mode !== 'signIn') {
      // Handle other modes if necessary
      return
    }
    try {
      // Directly await the server action.
      // Your `signIn` server action should return a structured response.
      const result = await signIn(data)

      console.log('Server action response:', result)

      if (result && result.success === true) {
        // If `redirectTo` is used in `authSignIn`, a redirect will likely occur
        // before this toast is seen, or this code might not even be reached
        // because the `NEXT_REDIRECT` signal will be thrown and handled by Next.js.
        // For successful redirects, often a toast here isn't needed as the redirect implies success.
        toast.success(
          result.message || 'Signed in successfully! Redirecting...'
        )
        // Note: NextAuth.js handles the actual redirect if specified in `authSignIn`.
      } else if (result && result.success === false) {
        toast.error(
          result.success || 'Sign in failed. Please check your credentials.'
        )
      } else {
        // This case might occur if the server action doesn't return the expected structure
        // or if an unhandled error occurred that wasn't caught by `executeAction`.
        toast.error('An unexpected error occurred during sign in.')
      }
    } catch (error: any) {
      console.error('Client-side error during signIn process:', error)
      // This catch block will primarily catch:
      // 1. Network errors preventing the server action call.
      // 2. If `executeAction` re-throws an error that isn't 'NEXT_REDIRECT'.
      // The 'NEXT_REDIRECT' signal should be handled by Next.js itself for navigation.
      if (error.message?.includes('NEXT_REDIRECT')) {
        // This is expected for redirects. Next.js is handling it.
        // You usually don't need to do anything here.
        console.log('Redirect signal received, Next.js is navigating...')
      } else {
        toast.error(error.message || 'Sign in failed. Please try again.')
      }
    }
  }

  return (
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
              type="email"
              className="border-gray-800"
            />
            <Input
              control={form.control}
              name="password"
              label="Password"
              type="password"
              className="border-gray-800"
            />
          </>
        )}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '...submitting' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
