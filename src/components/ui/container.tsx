import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/** Page gutter + max width. Every page section goes inside one of these. */
export function Container({
  children,
  measure = false,
  className,
}: {
  children: ReactNode
  /** Narrow to a comfortable reading width for long-form text. */
  measure?: boolean
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full px-6', measure ? 'max-w-measure' : 'max-w-page', className)}>
      {children}
    </div>
  )
}
