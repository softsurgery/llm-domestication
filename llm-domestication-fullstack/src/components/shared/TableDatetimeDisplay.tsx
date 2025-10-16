import { cn } from '@/lib/cn'

interface TableDatetimeDisplayProps {
  className?: string
  date: string
}

export const TableDatetimeDisplay = ({ className, date }: TableDatetimeDisplayProps) => {
  const dateTime = new Date(date)
  return (
    <div className={cn('flex items-start flex-col', className)}>
      <div>{dateTime?.toLocaleDateString()}</div>
      <div className="text-muted-foreground">{dateTime?.toLocaleTimeString()}</div>
    </div>
  )
}
