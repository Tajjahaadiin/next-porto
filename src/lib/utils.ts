import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import { AuthError } from 'next-auth'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown): string {
  let message: string

  if (error instanceof ZodError) {
    message = error.errors[0].message
  } else if (error instanceof AuthError) {
    message = error.cause?.err?.message || 'Unknown authorization error'
  } else if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Unknown error'
  }

  return message
}
