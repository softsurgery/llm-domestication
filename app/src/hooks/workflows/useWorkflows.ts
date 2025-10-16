import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Workflow } from '@/payload-types'

interface UseWorkflowsProps {
  enabled?: boolean
}

export function useWorkflows({ enabled = true }: UseWorkflowsProps) {
  const { data, isPending, refetch } = useQuery({
    queryKey: ['workflows'],
    queryFn: async (): Promise<Workflow[]> => {
      const res = await axios.get('/api/workflows', {
        params: { limit: 0 },
      })
      return res.data.docs
    },
    enabled,
  })

  return {
    data,
    isPending,
    refetch,
  }
}
