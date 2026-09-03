'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import type { Cigar } from '@/lib/cigars'

export function AddToCart({ cigar }: { cigar: Cigar }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(
      {
        cigarSlug: cigar.slug,
        name: cigar.name,
        price: cigar.price,
        priceValue: cigar.priceValue,
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="border-line rounded-control flex items-center border">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="text-body text-ink w-8 text-center">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <Button type="button" onClick={handleAdd} className="flex-1">
        {added ? 'Added to cart' : 'Add to cart'}
      </Button>
    </div>
  )
}
