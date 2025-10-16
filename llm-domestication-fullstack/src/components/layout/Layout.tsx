'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import Sidebar from './Sidebar'
import Header from './Header'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BreadcrumbContext, BreadcrumbRoute } from '@/contexts/BreadcrumbContext'
import { IntroContext } from '@/contexts/IntroContext'
import { PageHeader } from './PageHeader'

interface LayoutProps {
  className?: string
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Layout = observer(({ className, children }: LayoutProps) => {
  const [routes, setRoutes] = React.useState<BreadcrumbRoute[]>([])
  const breadcrumbContext = {
    routes,
    setRoutes,
    clearRoutes: () => {
      setRoutes?.([])
    },
  }
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [floating, setFloating] = React.useState<React.ReactNode>(null)
  const introContext = {
    title,
    description,
    floating,
    setIntro: (title: string, description?: string) => {
      setTitle(title)
      setDescription(description || '')
    },
    setFloating,
    clearIntro: () => {
      setTitle('')
      setDescription('')
    },
    clearFloating: () => {
      setFloating(null)
    },
  }

  return (
    <BreadcrumbContext.Provider value={breadcrumbContext}>
      <IntroContext.Provider value={introContext}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider enableSystem={true} attribute="class">
            <div className="flex flex-col flex-1 md:flex-row h-screen overflow-hidden">
              <Sidebar className="w-full md:w-64" />
              {/* Sidebar */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                {/* Main content */}
                <main
                  className={cn(
                    'flex flex-col flex-1 bg-background pt-5 px-5 overflow-hidden container mx-auto w-full',
                    className,
                  )}
                >
                  <PageHeader />
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </IntroContext.Provider>
    </BreadcrumbContext.Provider>
  )
})

export default Layout
