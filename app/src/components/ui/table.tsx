import * as React from 'react'
import { cn } from '@/lib/cn'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('min-w-full divide-y divide-border', className)} {...props}>
        {children}
      </table>
    </div>
  )
}

interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

export function TableHeader({ children, className, ...props }: TableSectionProps) {
  return (
    <thead className={cn('bg-card', className)} {...props}>
      {children}
    </thead>
  )
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export function TableHead({ children = null, className, ...props }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableBody({ children, className, ...props }: TableSectionProps) {
  return (
    <tbody className={cn('bg-card/25 divide-y divide-border ', className)} {...props}>
      {children}
    </tbody>
  )
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={cn('', className)} {...props}>
      {children}
    </tr>
  )
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td className={cn('px-4 py-4 text-sm whitespace-nowrap text-foreground', className)} {...props}>
      {children}
    </td>
  )
}

export function TableFooter({ children, className, ...props }: TableSectionProps) {
  return (
    <tfoot className={cn('bg-card border-t', className)} {...props}>
      {children}
    </tfoot>
  )
}
