import { cn } from '@/lib/cn'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label {...props} className={cn('block text-sm font-medium text-foreground', className)}>
      {children}
    </label>
  )
}
