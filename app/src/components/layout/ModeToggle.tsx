'use client'

import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

interface ModeToggleProps {
  className?: string
}

export default function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  return (
    <button
      className={className}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {theme == 'light' ? <FiSun /> : <FiMoon />}
    </button>
  )
}
