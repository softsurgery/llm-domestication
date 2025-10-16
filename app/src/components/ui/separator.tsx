import { cn } from '@/lib/cn'
import React from 'react'

const Separator = ({
  orientation = 'horizontal',
  color = 'border-border',
  thickness = 'border-[1px]',
  className = '',
  margin = 'm-0',
}) => {
  return (
    <div
      className={cn(
        color,
        thickness,
        margin,
        {
          'w-full border-t': orientation === 'horizontal',
          'h-full border-l': orientation === 'vertical',
        },
        className,
      )}
      role="separator"
    />
  )
}

export default Separator
