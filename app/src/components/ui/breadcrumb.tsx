'use client'

import * as React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { cn } from '@/lib/cn'

// Root container
export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn('flex items-center text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
)
Breadcrumb.displayName = 'Breadcrumb'

// List wrapper
export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn('flex flex-wrap items-center gap-1', className)} {...props} />
))
BreadcrumbList.displayName = 'BreadcrumbList'

// Individual item
export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('flex items-center gap-1', className)} {...props} />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

// Link (for non-active breadcrumb)
export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn('hover:text-primary hover:underline font-medium transition-colors', className)}
    {...props}
  />
))
BreadcrumbLink.displayName = 'BreadcrumbLink'

// Page (active breadcrumb)
export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('font-semibold text-foreground', className)} {...props} />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

// Optional separator (if needed elsewhere)
export const BreadcrumbSeparator = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="presentation" className={cn('text-muted-foreground', className)}>
    <FaChevronRight className="w-2 h-2" />
  </div>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'
