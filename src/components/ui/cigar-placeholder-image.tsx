import { cn } from '@/lib/utils'
import type { Cigar } from '@/lib/cigars'

/**
 * Stands in for real product photography, which the client has not supplied
 * yet. Every cigar gets its own band -- color and monogram derived from the
 * brand name -- so products read apart from each other the way they do on a
 * real shelf, rather than sharing one identical icon. Swap for real
 * photography per product once available (see CigarCard / cigar detail page).
 */

const BAND_TONES = [
  { fill: 'text-band-gold', ink: 'text-accent-ink' },
  { fill: 'text-band-oxblood', ink: 'text-ink' },
  { fill: 'text-band-bottle', ink: 'text-ink' },
] as const

function bandToneFor(brand: string) {
  let hash = 0
  for (let i = 0; i < brand.length; i++) hash = (hash * 31 + brand.charCodeAt(i)) >>> 0
  return BAND_TONES[hash % BAND_TONES.length]
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
  const tone = bandToneFor(cigar.brand)
  const initials = initialsFor(cigar.brand)

  return (
    <div
      className={cn(
        'bg-sunken border-line rounded-t-card flex aspect-[4/3] items-center justify-center border-b',
        className
      )}
    >
      <svg
        width="200"
        height="84"
        viewBox="0 0 200 84"
        fill="none"
        role="img"
        aria-label={`${cigar.name} cigar band`}
        className="text-ink-faint"
      >
        <rect
          x="8"
          y="28"
          width="144"
          height="28"
          rx="14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M152 28c16 0 32 6 32 14s-16 14-32 14" stroke="currentColor" strokeWidth="1.5" />
        <rect
          x="56"
          y="22"
          width="36"
          height="40"
          rx="2"
          className={tone.fill}
          fill="currentColor"
        />
        <text
          x="74"
          y="47"
          textAnchor="middle"
          fontSize="14"
          fontFamily="var(--font-serif)"
          fontWeight="600"
          className={tone.ink}
          fill="currentColor"
        >
          {initials}
        </text>
      </svg>
    </div>
  )
}
