import { cn } from '@/lib/cn'
import React, { createContext, useContext, useState, ReactNode, FC } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

interface AccordionItemContextType {
  value: string
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined)

interface AccordionProps {
  className?: string
  children: ReactNode
  type?: 'single' | 'multiple'
}

export const Accordion: FC<AccordionProps> = ({ className, children, type = 'single' }) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      type === 'single'
        ? prev.includes(value)
          ? []
          : [value]
        : prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
    )
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('w-full border rounded-xl divide-y divide-border', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  className?: string
  children: ReactNode
  value: string
}

export const AccordionItem: FC<AccordionItemProps> = ({ className, children, value }) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={cn(
          'border-b last:border-none first:rounded-t-xl last:rounded-b-xl overflow-hidden',
          className,
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

interface AccordionTriggerProps {
  children: ReactNode
}

export const AccordionTrigger: FC<AccordionTriggerProps> = ({ children }) => {
  const accordion = useContext(AccordionContext)
  const item = useContext(AccordionItemContext)

  if (!accordion || !item) {
    throw new Error('AccordionTrigger must be used within AccordionItem')
  }

  const isOpen = accordion.openItems.includes(item.value)

  return (
    <button
      onClick={() => accordion.toggleItem(item.value)}
      className="w-full flex justify-between items-center py-3 px-4 font-medium text-left hover:bg-muted/25 transition"
    >
      <div>{children}</div>
      <span
        className={cn(`transform transition-transform duration-300`, isOpen ? 'rotate-180' : '')}
      >
        <FaChevronDown />
      </span>
    </button>
  )
}

interface AccordionContentProps {
  className?: string
  children: ReactNode
}

export const AccordionContent: FC<AccordionContentProps> = ({ className, children }) => {
  const accordion = useContext(AccordionContext)
  const item = useContext(AccordionItemContext)

  if (!accordion || !item) {
    throw new Error('AccordionContent must be used within AccordionItem')
  }

  const isOpen = accordion.openItems.includes(item.value)

  return (
    <div
      className={cn(
        `overflow-hidden transition-all duration-300`,
        className,
        isOpen ? 'opacity-100' : 'max-h-0 opacity-0',
      )}
    >
      <div className="py-2 px-4">{children}</div>
    </div>
  )
}
