import { cn } from '@/lib/cn'
import Image from 'next/image'
import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-background border rounded-lg shadow-sm pb-4 flex flex-col ${className} w-fit`}
    >
      {children}
    </div>
  )
}

interface CardCoverProps {
  src: string
  alt?: string
  className?: string
  children?: ReactNode
}

export function CardCover({ src, alt = '', className, children }: CardCoverProps) {
  return (
    <div
      className={cn(
        `relative w-full rounded-t-lg overflow-hidden border-b h-[30vh] mb-4`,
        className,
      )}
    >
      <Image src={src} alt={alt} className="object-cover w-full h-full" fill />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          {children}
        </div>
      )}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn(`mb-2 px-4 flex flex-col`, className)}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn(`text-lg font-semibold`, className)}>{children}</h3>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(`text-sm px-4`, className)}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn(`mt-4 flex justify-end gap-2 px-4`, className)}>{children}</div>
}
