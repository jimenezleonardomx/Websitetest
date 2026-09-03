import type { ReactNode } from 'react'

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-caption text-ink-muted tracking-wide uppercase">
        {label}
      </label>
      {children}
    </div>
  )
}
