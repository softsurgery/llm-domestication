import { cn } from '@/lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
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
    primary: 'bg-primary text-foreground hover:bg-primary/75',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/75',
    destructive: 'bg-destructive text-foreground hover:bg-destructive/75',
    outline: 'border text-forground bg-transparent hover:bg-muted',
    ghost: 'text-foreground bg-transparent hover:bg-muted',
    link: 'text-foreground underline hover:text-foreground/75',
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
