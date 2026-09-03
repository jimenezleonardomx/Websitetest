import { cn } from '@/lib/utils'

/**
 * Placeholder recreation of the Sautter script wordmark, built as inline SVG
 * (no external font needed). Swap for the real logo file as soon as it's
 * available -- see src/components/site-header.tsx.
 */
export function SautterWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      className={cn('text-accent h-12 w-auto', className)}
      role="img"
      aria-label="Sautter"
    >
      <text
        x="4"
        y="40"
        fontFamily="'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive"
        fontSize="40"
        fontWeight="600"
        fontStyle="italic"
        fill="currentColor"
      >
        Sautter
      </text>
      <path
        d="M6 50c30 10 60 10 90 2s70-8 100 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  )
}
