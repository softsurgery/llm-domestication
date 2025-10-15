'use client'

import { cn } from '@/lib/cn'
import { observer } from 'mobx-react-lite'
import ModeToggle from './ModeToggle'

interface HeaderProps {
  className?: string
}

export const Header = observer(({ className }: HeaderProps) => {
  return (
    <header
      className={cn('flex items-center justify-between p-4 border-b bg-background', className)}
    >
      <ModeToggle />
    </header>
  )
})

export default Header
