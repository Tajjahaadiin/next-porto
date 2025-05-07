'use client'
import { useQuery } from '@tanstack/react-query'

export const contentKeys = {
  all: ['techstack'] as const,
  detail: () => [...contentKeys.all, 'detail'] as const,
}

export function useGetTech() {
  // Query for fetching content
  const {
    isError,
    isLoading,
    data: techstacks,
    error,
  } = useQuery({
    queryKey: contentKeys.detail(),
    queryFn:
  })

  return {
    techstacks,
    isLoading,
    isError,
    error,
  }
}
