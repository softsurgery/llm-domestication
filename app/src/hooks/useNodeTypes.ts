import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { NodeType } from '@/payload-types'

interface UseNodeTypesProps {
  enabled?: boolean
}

export function useNodeTypes({ enabled = true }: UseNodeTypesProps) {
  const { data, isPending } = useQuery({
    queryKey: ['node-types'],
    queryFn: async (): Promise<NodeType[]> => {
      const res = await axios.get('/api/node-types', {
        params: { limit: 0 },
      })
      return res.data.docs
    },
    enabled,
  })

  return {
    data,
    isPending,
  }
}
