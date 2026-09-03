'use client'

import { motion, useReducedMotion } from 'motion/react'

export function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  decreaseLabel = 'Decrease quantity',
  increaseLabel = 'Increase quantity',
}: {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  decreaseLabel?: string
  increaseLabel?: string
}) {
  const reduceMotion = useReducedMotion()
  const tap = reduceMotion ? undefined : { scale: 0.85 }

  return (
    <div className="border-line rounded-control flex items-center border">
      <motion.button
        whileTap={tap}
        type="button"
        onClick={onDecrease}
        className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
        aria-label={decreaseLabel}
      >
        −
      </motion.button>
      <span className="text-body text-ink w-8 text-center">{quantity}</span>
      <motion.button
        whileTap={tap}
        type="button"
        onClick={onIncrease}
        className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
        aria-label={increaseLabel}
      >
        +
      </motion.button>
    </div>
  )
}
