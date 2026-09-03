'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink shadow-raise',
  secondary: 'bg-surface text-ink border border-line hover:border-line-strong shadow-raise',
  ghost: 'text-ink-muted hover:bg-sunken hover:text-ink',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-caption',
  md: 'h-10 px-4 text-body',
}

/**
 * `motion.button` redefines a handful of DOM event handlers (drag,
 * animation) with its own gesture-aware signatures -- omit the native
 * versions so callers get motion's types instead of a conflict.
 */
export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> & {
  variant?: Variant
  size?: Size
}

/**
 * Real tap/press feedback via `motion` -- this world's identity is built on
 * things visibly changing state, so buttons get more than a color swap.
 * See project-ui SKILL.md's Motion section before adding a new pattern.
 */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      whileHover={
        reduceMotion
          ? undefined
          : variant === 'primary'
            ? { backgroundColor: 'var(--color-accent-hover)' }
            : { backgroundColor: 'var(--color-sunken)' }
      }
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-control inline-flex items-center justify-center gap-2 font-medium',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  )
}
