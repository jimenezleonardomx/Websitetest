'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { CigarPlaceholderImage } from '@/components/ui/cigar-placeholder-image'
import type { Cigar } from '@/lib/cigars'
import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

export function CigarCard({ cigar, className }: { cigar: Cigar; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionLink
      href={`/cigars/${cigar.slug}`}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group rounded-card border-line bg-surface shadow-raise hover:border-line-strong hover:shadow-float block overflow-hidden border',
        'ease-out-soft scroll-drift transition-[colors,box-shadow] duration-150',
        className
      )}
    >
      <CigarPlaceholderImage cigar={cigar} />
      <div className="p-8">
        <p className="text-caption text-ink-faint tracking-wide uppercase">
          {cigar.brand} · {cigar.origin}
        </p>
        <h3 className="text-title text-ink mt-3 font-serif">{cigar.name}</h3>
        <p className="text-body text-ink-muted mt-3">{cigar.summary}</p>
        <div className="border-line mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-caption text-ink-muted">
            {cigar.length} · {cigar.ringGauge} ring · {cigar.strength}
          </span>
          <span className="text-body text-ink font-medium">{cigar.price}</span>
        </div>
      </div>
    </MotionLink>
  )
}
