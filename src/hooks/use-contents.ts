'use client'

import { getContent } from '@/app/actions/getContents'
import { useQuery } from '@tanstack/react-query'

export const contentKeys = {
  all: ['content'] as const,
  detail: () => [...contentKeys.all, 'detail'] as const,
}

export function useContent() {
  // Query for fetching content
  const {
    isError,
    isLoading,
    data: content,
    error,
  } = useQuery({
    queryKey: contentKeys.detail(),
    queryFn: getContent,
  })

  return {
    content,
    isLoading,
    isError,
    error,
  }
}
