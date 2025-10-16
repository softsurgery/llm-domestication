'use client'
import { cn } from '@/lib/cn'
import { MdDashboard } from 'react-icons/md'
import { BsPcDisplay } from 'react-icons/bs'
import { IoIosGitNetwork } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const path = usePathname()

  const items: Record<string, { name: string; href: string; icon: React.ReactNode }[]> = {
    '1': [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        name: 'Workflows',
        href: '/workflows',
        icon: <IoIosGitNetwork />,
      },
      {
        name: 'Executions',
        href: '/executions',
        icon: <BsPcDisplay />,
      },
    ],
    '2': [
      {
        name: 'Settings',
        href: '/settings',
        icon: <IoSettings />,
      },
    ],
  }
  return (
    <aside
      className={cn(
        'flex flex-col border p-4 md:h-screen md:sticky top-0 bg-background',
        className,
      )}
    >
      <h1 className="text-2xl font-bold">Domestication</h1>
      <div className="flex flex-col justify-between h-full mt-4">
        {Object.keys(items).map((key) => (
          <nav key={key} className="flex flex-col space-y-2">
            {items[key].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg',
                  path == item.href ? 'bg-primary hover:bg-primary/75' : 'hover:bg-muted',
                )}
              >
                {item.icon}
                <span className="mx-2 text-sm font-medium">{item.name}</span>
              </a>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  )
}
