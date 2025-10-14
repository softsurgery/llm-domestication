'use client'

import { cn } from '@/lib/cn'
import appModel from '@/models/app.model'
import Button from '../ui/button'
import { observer } from 'mobx-react-lite'

interface HeaderProps {
  className?: string
}

export const Header = observer(({ className }: HeaderProps) => {
  return (
    <header className={cn('flex items-center justify-between p-4 border-b', className)}>
      <h1 className="text-2xl font-bold">Domestication</h1>
      <p>{appModel.theme}</p>
      <Button onClick={() => appModel.setTheme(appModel.theme == 'light' ? 'dark' : 'light')}>
        Change theme
      </Button>
    </header>
  )
})

export default Header
