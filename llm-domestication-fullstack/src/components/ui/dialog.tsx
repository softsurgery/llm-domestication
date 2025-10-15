import React, { createContext, useContext, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from './button'
import { cn } from '@/lib/cn'

interface DialogContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProps {
  children: ReactNode
}

export function Dialog({ children }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return <DialogContext.Provider value={{ isOpen, open, close }}>{children}</DialogContext.Provider>
}

interface DialogHeaderProps {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

export function DialogHeader({ title, description, children, className = '' }: DialogHeaderProps) {
  return (
    <div className={cn('bg-background pt-4', className)}>
      {title && <h2 className="text-xl font-semibold text-foreground pt-2">{title}</h2>}
      {description && <p className="text-sm text-muted-foreground p-1">{description}</p>}
      {children}
    </div>
  )
}

interface DialogTriggerProps {
  className?: string
  children: ReactNode
}

export function DialogTrigger({ className, children }: DialogTriggerProps) {
  const context = useContext(DialogContext)!
  return (
    <div className={cn(className)} onClick={context.open}>
      {children}
    </div>
  )
}

interface DialogContentProps {
  className?: string
  children: ReactNode
}

export function DialogContent({ className, children }: DialogContentProps) {
  const context = useContext(DialogContext)!
  if (!context.isOpen) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 grid h-screen w-screen place-items-center backdrop-blur-sm',
        )}
        onClick={context.close}
      >
        {/* Dialog Container */}
        <div
          className={cn(
            'relative bg-background rounded-lg shadow-lg pb-6 px-6 min-w-[30vw] max-w-[70vw] max-h-[80vh] overflow-y-auto border',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  )
}

interface DialogFooterProps {
  children: ReactNode
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>
}

export function DialogCloseButton() {
  const context = useContext(DialogContext)!
  return (
    <Button variant="destructive" onClick={context.close}>
      Close
    </Button>
  )
}
