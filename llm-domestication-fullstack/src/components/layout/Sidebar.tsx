import { cn } from '@/lib/cn'
import { MdDashboard } from 'react-icons/md'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('flex flex-col border p-4 md:h-screen md:sticky top-0', className)}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Domestication</h1>
        <nav className="flex flex-col space-y-2">
          <a href="#" className="hover:text-amber-600 flex items-center gap-2">
            <MdDashboard />
            Home
          </a>
          <a href="#" className="hover:text-amber-600">
            About
          </a>
          <a href="#" className="hover:text-amber-600">
            Contact
          </a>
        </nav>
      </div>
    </aside>
  )
}
