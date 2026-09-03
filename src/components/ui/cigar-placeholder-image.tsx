import { cn } from '@/lib/utils'
import type { Cigar } from '@/lib/cigars'

/**
 * Stands in for real product photography, which the client has not supplied
 * yet. Rendered as a print still emerging from the developer tray -- the
 * darkroom world's signature motion (see `.developing` in globals.css) --
 * with a tone and monogram derived from the brand name so products read
 * apart from each other. Swap for real photography per product once
 * available (see CigarCard / cigar detail page).
 */

const PRINT_TONES = ['text-print-light', 'text-print-mid', 'text-print-dark'] as const

function printToneFor(brand: string) {
  let hash = 0
  for (let i = 0; i < brand.length; i++) hash = (hash * 31 + brand.charCodeAt(i)) >>> 0
  return PRINT_TONES[hash % PRINT_TONES.length]
}

function initialsFor(brand: string) {
  return brand
    .split(/\s+/)
    .filter((word) => /[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function CigarPlaceholderImage({ cigar, className }: { cigar: Cigar; className?: string }) {
  const tone = printToneFor(cigar.brand)
  const initials = initialsFor(cigar.brand)

  return (
    <div
      className={cn(
        'bg-sunken border-line rounded-t-card developing flex aspect-[4/3] items-center justify-center border-b',
        className
      )}
      role="img"
      aria-label={`${cigar.name} product photo -- not yet available`}
    >
      <span className={cn('text-title relative z-10 font-serif', tone)}>{initials}</span>
    </div>
  )
}
