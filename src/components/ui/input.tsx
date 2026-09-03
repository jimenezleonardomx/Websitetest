import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-line bg-surface text-ink placeholder:text-ink-faint rounded-control text-body h-10 w-full border px-3',
        'hover:border-line-strong ease-out-soft transition-colors duration-150',
        className
      )}
      {...props}
    />
  )
}
