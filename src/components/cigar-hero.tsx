'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import { AddToCart } from '@/components/add-to-cart'
import { Card } from '@/components/ui/card'
import { CigarPlaceholderImage } from '@/components/ui/cigar-placeholder-image'
import type { Cigar } from '@/lib/cigars'

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
}

/**
 * The one authored page-entrance per project-ui SKILL.md's Motion section --
 * the hero develops into view as a single staggered sequence, mirroring the
 * darkroom world's signature "developing" motion.
 */
export function CigarHero({ cigar }: { cigar: Cigar }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? 'shown' : 'hidden'}
      animate="shown"
      transition={{ staggerChildren: 0.06 }}
    >
      <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <CigarPlaceholderImage cigar={cigar} className="rounded-panel mt-8 border-b-0" />
      </motion.div>

      <motion.p
        variants={item}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-body text-ink-muted mt-8"
      >
        {cigar.brand} · {cigar.origin}
      </motion.p>

      <motion.h1
        variants={item}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-display text-ink mt-2 font-serif"
      >
        {cigar.name}
      </motion.h1>

      <motion.p
        variants={item}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-lead text-ink-muted mt-4"
      >
        {cigar.summary}
      </motion.p>

      <motion.div
        variants={item}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <AddToCart cigar={cigar} />
      </motion.div>

      <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <Card className="divide-line mt-10 grid grid-cols-2 divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="py-3 text-center first:pt-0 last:pb-0 sm:px-4 sm:py-0">
            <p className="text-caption text-ink-muted tracking-wide uppercase">Length</p>
            <p className="text-lead text-ink mt-1 font-serif">{cigar.length}</p>
          </div>
          <div className="py-3 text-center first:pt-0 last:pb-0 sm:px-4 sm:py-0">
            <p className="text-caption text-ink-muted tracking-wide uppercase">Gauge</p>
            <p className="text-lead text-ink mt-1 font-serif">{cigar.ringGauge}</p>
          </div>
          <div className="py-3 text-center first:pt-0 last:pb-0 sm:px-4 sm:py-0">
            <p className="text-caption text-ink-muted tracking-wide uppercase">Strength</p>
            <p className="text-lead text-ink mt-1 font-serif">{cigar.strength}</p>
          </div>
          <div className="py-3 text-center first:pt-0 last:pb-0 sm:px-4 sm:py-0">
            <p className="text-caption text-ink-muted tracking-wide uppercase">Price</p>
            <p className="text-lead text-accent mt-1 font-serif">{cigar.price}</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
