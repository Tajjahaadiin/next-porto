'use client'

import { getProjectsWithTechStack } from '@/app/actions/getProjects'
import { useQuery } from '@tanstack/react-query'

export const contentKeys = {
  all: ['projects'] as const,
  detail: () => [...contentKeys.all, 'detail'] as const,
}

export function useGetProject() {
  // Query for fetching content
  const {
    isError,
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: contentKeys.detail(),
    queryFn: getProjectsWithTechStack,
  })

  return {
    projects,
    isLoading,
    isError,
    error,
  }
}
