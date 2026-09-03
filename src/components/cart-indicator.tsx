'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export function CartIndicator() {
  const { count } = useCart()

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="hover:bg-sunken rounded-control ease-out-soft relative inline-flex h-10 w-10 items-center justify-center transition-colors duration-150"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 6h11.5l-1.2 7.2a1.5 1.5 0 0 1-1.48 1.3H6.9a1.5 1.5 0 0 1-1.48-1.26L4 3.5H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="17.5" r="1.1" fill="currentColor" />
        <circle cx="14.5" cy="17.5" r="1.1" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="bg-accent text-accent-ink absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] leading-none font-medium">
          {count}
        </span>
      )}
    </Link>
  )
}
