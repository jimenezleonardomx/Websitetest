import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn('text-body text-ink-muted flex items-center gap-2', className)}
    >
      <input
        id={id}
        type="checkbox"
        className="accent-accent border-line-strong h-4 w-4 rounded-sm"
        {...props}
      />
      {label}
    </label>
  )
}
