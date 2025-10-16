import React, { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

const Textarea: React.FC<InputProps> = ({ id, className, ...props }) => {
  return (
    <textarea
      id={id}
      className={cn(
        `block mt-2 w-full rounded-lg border px-5 py-2.5 focus:border-primary focus:outline-none focus:ring focus:ring-primary`,
        className,
      )}
      {...props}
    />
  )
}

export default Textarea
