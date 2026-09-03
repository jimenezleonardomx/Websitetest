import { cn } from '@/lib/utils'

/**
 * Stands in for real product photography, which the client has not supplied
 * yet. Original line-art, not a photo -- swap for real images per product
 * once available (see CigarCard / cigar detail page).
 */
export function CigarPlaceholderImage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-sunken border-line rounded-t-card flex aspect-[4/3] items-center justify-center border-b',
        className
      )}
      aria-hidden="true"
    >
      <svg width="96" height="40" viewBox="0 0 96 40" fill="none" className="text-ink-faint">
        <rect x="4" y="14" width="70" height="12" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M74 14c8 0 18 3 18 6s-10 6-18 6" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="12" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
