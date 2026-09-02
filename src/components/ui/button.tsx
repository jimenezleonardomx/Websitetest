import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover shadow-raise',
  secondary: 'bg-surface text-ink border border-line hover:border-line-strong shadow-raise',
  ghost: 'text-ink-muted hover:bg-sunken hover:text-ink',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-caption',
  md: 'h-10 px-4 text-body',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'ease-out-soft rounded-control inline-flex items-center justify-center gap-2 font-medium',
        'transition-colors duration-150',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  )
}
