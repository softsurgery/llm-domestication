'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { cn } from '@/lib/cn'
import { useIntro } from '@/contexts/IntroContext'
import { useBreadcrumb } from '@/contexts/BreadcrumbContext'
import { useDebounce } from '@/hooks/useDebounce'
import { usePaginatedWorkflows } from '@/hooks/workflows/usePaginatedWorkflows'
import { User } from '@/payload-types'
import { TableDatetimeDisplay } from '../shared/TableDatetimeDisplay'
import { getPaginationMeta } from '@/lib/table'

interface WorkflowPortalProps {
  className?: string
}

export const WorkflowPortal = ({ className }: WorkflowPortalProps) => {
  const router = useRouter()
  const { setIntro, clearIntro } = useIntro()
  const { setRoutes, clearRoutes } = useBreadcrumb()
  React.useEffect(() => {
    setIntro?.('Workflow Portal', 'This is the Workflow Portal')
    setRoutes?.([
      { title: 'Home', href: '/' },
      { title: 'Workflows', href: '/workflows' },
      { title: 'Executions', href: '/executions' },
    ])
    return () => {
      clearIntro?.()
      clearRoutes?.()
    }
  }, [])

  const [page, setPage] = React.useState(1)
  const { value: debouncedPage, loading: paging } = useDebounce<number>(page, 500)

  const [size, setSize] = React.useState(10)
  const { value: debouncedSize, loading: resizing } = useDebounce<number>(size, 500)

  const [sortDetails, setSortDetails] = React.useState({
    order: true,
    sortKey: 'id',
  })
  const { value: debouncedSortDetails, loading: sorting } = useDebounce<typeof sortDetails>(
    sortDetails,
    500,
  )

  const [searchTerm, setSearchTerm] = React.useState('')
  const { value: debouncedSearchTerm, loading: searching } = useDebounce<string>(searchTerm, 500)

  const { data } = usePaginatedWorkflows({
    page: debouncedPage,
    limit: debouncedSize,
    sort: debouncedSortDetails.sortKey,
  })

  const workflows = React.useMemo(() => {
    if (!data) return []
    return data.docs
  }, [data])

  const paginationMeta = React.useMemo(() => {
    if (!data) return null
    return getPaginationMeta(data.totalDocs, debouncedPage, debouncedSize)
  }, [data, debouncedPage, debouncedSize])

  return (
    <div className={cn('flex flex-col flex-1 overflow-hidden', className)}>
      <div className="flex flex-col flex-1 overflow-hidden gap-4 mt-6">
        <Button className="w-fit ml-auto" onClick={() => router.push('/')}>
          New Workflow
        </Button>
        <div className="overflow-hidden border md:rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {workflows?.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>{workflow.id}</TableCell>
                  <TableCell>{workflow.name}</TableCell>
                  <TableCell>{workflow.description}</TableCell>
                  <TableCell>{(workflow.owner as User).email}</TableCell>
                  <TableCell>
                    <TableDatetimeDisplay date={workflow.createdAt} />
                  </TableCell>
                  <TableCell>
                    <TableDatetimeDisplay date={workflow.updatedAt} />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  {paginationMeta
                    ? `Showing ${paginationMeta.startIndex}–${paginationMeta.endIndex} of ${paginationMeta.totalDocs} results`
                    : 'Loading...'}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}
