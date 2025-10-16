import React, { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input: React.FC<InputProps> = ({ id, className, ...props }) => {
  return (
    <input
      id={id}
      className={cn(
        `block mt-2 w-full rounded-lg border px-5 py-2.5 focus:border-primary focus:outline-none focus:ring focus:ring-primary`,
        className,
      )}
      {...props}
    />
  )
}

export default Input
