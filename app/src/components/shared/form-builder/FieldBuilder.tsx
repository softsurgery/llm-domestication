import React from 'react'
import { Field } from './types'
import Input from '@/components/ui/input'
import { cn } from '@/lib/cn'
import { PasswordField } from './PasswordField'
import Textarea from '@/components/ui/textarea'

interface FieldBuilderProps {
  field?: Field<any>
}

export const FieldBuilder = ({ field }: FieldBuilderProps) => {
  switch (field?.variant) {
    case 'text':
    case 'email':
    case 'tel':
    case 'url':
      return (
        <Input
          {...field.props}
          className={cn(
            field?.className,
            field.error && 'border-destructive focus-visible:ring-destructive',
          )}
          type={field.variant}
          value={field.props.value}
          placeholder={field.placeholder}
        />
      )
    case 'number':
      return (
        <Input
          {...field.props}
          className={cn(
            field?.className,
            field.error && 'border-destructive focus-visible:ring-destructive',
          )}
          type={field.variant}
          min={field.props?.min}
          max={field.props?.max}
          value={field.props?.value}
          placeholder={field?.placeholder}
          onChange={(event) => {
            const inputValue = Number(event.target.value)
            const min = field.props?.min ?? -Infinity
            const max = field.props?.max ?? Infinity
            const clampedValue = Math.max(min, Math.min(max, inputValue))
            field?.props?.onChange?.(clampedValue)
          }}
        />
      )
    case 'password':
      return (
        <PasswordField
          {...field.props}
          className={cn(
            'pr-10',
            field.error && 'border-destructive focus-visible:ring-destructive',
            field?.className,
          )}
          value={field?.props?.value as string}
          onChange={(e) => field?.props?.onChange?.(e.target.value)}
        />
      )

    case 'textarea':
      return (
        <Textarea
          {...field.props}
          id={field.id}
          className={cn(!field.props?.resizable && 'resize-none', field?.className)}
          placeholder={field.placeholder}
          value={field.props?.value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            field?.props?.onChange?.(e.target.value)
          }
        />
      )

    case 'custom':
      return (
        <div className={cn('flex flex-col gap-2', field?.className)}>{field.props?.children}</div>
      )
    case 'empty':
      return null
    default:
      return <span className="text-xs text-red-500">Cannot Render Element</span>
  }
}
