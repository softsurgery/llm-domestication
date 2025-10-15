'use client'

import { cn } from '@/lib/cn'
import Sidebar from './Sidebar'
import Header from './Header'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'next-themes'

interface LayoutProps {
  className?: string
  children: React.ReactNode
}

const Layout = observer(({ className, children }: LayoutProps) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="flex flex-col flex-1 md:flex-row min-h-screen max-h-screen">
        {/* Sidebar */}
        <Sidebar className="w-full md:w-64 flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <Header />
          {/* Main content */}
          <main className={cn('flex-1 bg-background px-2', className)}>{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
})

export default Layout
