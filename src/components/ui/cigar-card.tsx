import Link from 'next/link'
import { CigarPlaceholderImage } from '@/components/ui/cigar-placeholder-image'
import type { Cigar } from '@/lib/cigars'
import { cn } from '@/lib/utils'

export function CigarCard({ cigar, className }: { cigar: Cigar; className?: string }) {
  return (
    <Link
      href={`/cigars/${cigar.slug}`}
      className={cn(
        'rounded-card border-line bg-surface shadow-raise hover:border-line-strong block overflow-hidden border',
        'ease-out-soft transition-colors duration-150',
        className
      )}
    >
      <CigarPlaceholderImage />
      <div className="p-6">
        <p className="text-caption text-ink-muted tracking-wide uppercase">{cigar.origin}</p>
        <h3 className="text-title text-ink mt-2 font-serif">{cigar.name}</h3>
        <p className="text-body text-ink-muted mt-2">{cigar.summary}</p>
        <div className="text-caption text-ink-faint mt-4 flex gap-4">
          <span>
            {cigar.length} · {cigar.ringGauge} ring
          </span>
          <span>{cigar.strength}</span>
          <span className="text-accent font-medium">{cigar.price}</span>
        </div>
      </div>
    </Link>
  )
}
