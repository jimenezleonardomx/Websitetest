import Link from 'next/link'
import { CigarPlaceholderImage } from '@/components/ui/cigar-placeholder-image'
import type { Cigar } from '@/lib/cigars'
import { cn } from '@/lib/utils'

export function CigarCard({ cigar, className }: { cigar: Cigar; className?: string }) {
  return (
    <Link
      href={`/cigars/${cigar.slug}`}
      className={cn(
        'rounded-card border-line bg-surface shadow-raise hover:border-line-strong hover:shadow-float block overflow-hidden border',
        'ease-out-soft scroll-drift transition-[colors,box-shadow] duration-150',
        className
      )}
    >
      <CigarPlaceholderImage />
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
    </Link>
  )
}
