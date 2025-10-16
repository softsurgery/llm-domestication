import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Workflow } from '@/payload-types'
import { PaginatedDocs } from 'payload'

interface UsePaginatedWorkflowsProps {
  page?: number
  limit?: number
  sort?: string
  enabled?: boolean
}

export function usePaginatedWorkflows({
  page = 1,
  limit = 10,
  sort = '-createdAt',
  enabled = true,
}: UsePaginatedWorkflowsProps) {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['workflows'],
    queryFn: async (): Promise<PaginatedDocs<Workflow>> => {
      const res = await axios.get('/api/workflows', {
        params: { page, limit, sort },
      })
      return res.data
    },
    enabled,
  })

  return {
    data,
    isPending,
    refetch,
  }
}
