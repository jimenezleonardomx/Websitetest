'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart()
  const router = useRouter()

  return (
    <main className="py-24">
      <Container measure>
        <h1 className="text-display text-ink font-serif">Your cart.</h1>

        {items.length === 0 ? (
          <Card className="mt-10">
            <p className="text-body text-ink">Your cart is empty.</p>
            <p className="text-body text-ink-muted mt-2">
              Browse{' '}
              <Link href="/cigars" className="text-accent font-medium">
                the range
              </Link>{' '}
              to find something for the humidor.
            </p>
          </Card>
        ) : (
          <>
            <div className="mt-10 flex flex-col gap-4">
              {items.map((item) => (
                <Card
                  key={item.cigarSlug}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-body text-ink font-medium">{item.name}</p>
                    <p className="text-caption text-ink-muted mt-1">{item.price} each</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="border-line rounded-control flex items-center border">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.cigarSlug, item.quantity - 1)}
                        className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="text-body text-ink w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.cigarSlug, item.quantity + 1)}
                        className="text-ink-muted hover:text-ink flex h-10 w-10 items-center justify-center text-lg"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-body text-ink w-16 text-right font-medium">
                      £{(item.priceValue * item.quantity).toFixed(0)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.cigarSlug)}
                      className="text-caption text-ink-faint hover:text-danger"
                    >
                      Remove
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 flex items-center justify-between">
              <p className="text-body text-ink-muted">Subtotal</p>
              <p className="text-title text-ink font-serif">£{subtotal.toFixed(0)}</p>
            </Card>

            <Button className="mt-6 w-full" onClick={() => router.push('/checkout')}>
              Checkout
            </Button>
          </>
        )}
      </Container>
    </main>
  )
}
