import { cn } from '@/lib/cn'
import { MdDashboard } from 'react-icons/md'
import { BsPcDisplay } from 'react-icons/bs'
import { IoIosGitNetwork } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col border p-4 md:h-screen md:sticky top-0 bg-background',
        className,
      )}
    >
      <h1 className="text-2xl font-bold">Domestication</h1>
      <div className="flex flex-col justify-between h-full mt-4">
        <nav className="flex flex-col space-y-2">
          <a href="/dashboard" className="hover:text-amber-600 flex items-center gap-2">
            <MdDashboard />
            Dashboard
          </a>
          <a href="/workflows" className="hover:text-amber-600 flex items-center gap-2">
            <IoIosGitNetwork />
            Workflows
          </a>
          <a href="/executions" className="hover:text-amber-600 flex items-center gap-2">
            <BsPcDisplay />
            Executions
          </a>
        </nav>
        <nav>
          <a href="/settings" className="hover:text-amber-600 flex items-center gap-2">
            <IoSettings />
            Settings
          </a>
        </nav>
      </div>
    </aside>
  )
}
