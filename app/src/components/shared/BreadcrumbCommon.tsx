'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/cn'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BreadcrumbItemType {
  title: string
  href?: string
}

interface BreadcrumbCommonProps {
  className?: string
  hierarchy?: BreadcrumbItemType[]
}

export const BreadcrumbCommon = ({ className, hierarchy = [] }: BreadcrumbCommonProps) => {
  const router = useRouter()
  const lastIndex = hierarchy.length - 1

  return (
    <Breadcrumb className={cn('my-auto', className)} aria-label="Breadcrumb">
      <BreadcrumbList className="flex flex-wrap items-center gap-1">
        {hierarchy.map((item, index) => {
          const isLast = index === lastIndex

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index} className="flex items-center gap-1">
                {item.href && !isLast ? (
                  <BreadcrumbLink
                    className="text-xs font-semibold cursor-pointer"
                    onClick={() => router.push(item.href!)}
                  >
                    {item.title}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-xs font-medium" aria-current="page">
                    {item.title}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
