'use client'

import { getTechstack } from '@/app/actions/getTechstack'
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
    queryFn: getTechstack,
  })

  return {
    techstacks,
    isLoading,
    isError,
    error,
  }
}
