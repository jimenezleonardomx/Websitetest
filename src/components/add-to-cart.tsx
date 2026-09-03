'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
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
      <QuantityStepper
        quantity={quantity}
        onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrease={() => setQuantity((q) => q + 1)}
      />
      <Button type="button" onClick={handleAdd} className="flex-1">
        {added ? 'Added to cart' : 'Add to cart'}
      </Button>
    </div>
  )
}
