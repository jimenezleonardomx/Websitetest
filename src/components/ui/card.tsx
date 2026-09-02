import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-card border-line bg-surface shadow-raise border p-6', className)}>
      {children}
    </div>
  )
}
