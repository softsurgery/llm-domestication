import { cn } from '@/lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[oklch(from_var(--color-primary)_l_c_h_/_0.9)]',
    secondary:
      'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[oklch(from_var(--color-secondary)_l_c_h_/_0.9)]',
    destructive:
      'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:bg-[oklch(from_var(--color-destructive)_l_c_h_/_0.9)]',
    outline:
      'border border-[var(--color-border)] text-[var(--color-foreground)] bg-transparent hover:bg-[var(--color-muted)]',
    ghost: 'text-[var(--color-foreground)] bg-transparent hover:bg-[var(--color-muted)]',
  }

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8 text-base',
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
