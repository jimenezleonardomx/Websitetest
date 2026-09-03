import { cn } from '@/lib/utils'
import Link from 'next/link'

export type NavPage = {
  href: string
  label: string
  description: string
}

/**
 * Hover/focus dropdown listing every page on the site. Stays in the DOM and
 * keyboard-reachable at all times -- opacity/pointer-events toggle visibility
 * so tabbing into a link still works without a visibility:hidden trap.
 */
export function NavMenu({ pages, className }: { pages: NavPage[]; className?: string }) {
  return (
    <div className={cn('group relative pb-2', className)}>
      <button
        type="button"
        aria-haspopup="true"
        className={cn(
          'rounded-control inline-flex h-10 items-center gap-2 px-4 font-medium',
          'text-ink hover:bg-sunken ease-out-soft transition-colors duration-150'
        )}
      >
        Pages
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className="ease-out-soft transition-transform duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={cn(
          'shadow-float border-line bg-surface rounded-panel absolute top-full left-0 z-10 w-72 border p-2',
          'pointer-events-none opacity-0',
          'group-hover:pointer-events-auto group-hover:opacity-100',
          'group-focus-within:pointer-events-auto group-focus-within:opacity-100',
          'ease-out-soft transition-opacity duration-150'
        )}
      >
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="hover:bg-sunken rounded-control ease-out-soft block px-3 py-2 transition-colors duration-150"
          >
            <p className="text-body text-ink font-medium">{page.label}</p>
            <p className="text-caption text-ink-muted mt-0.5">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
