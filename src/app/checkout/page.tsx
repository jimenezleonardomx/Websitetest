'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import { createClient } from '@/lib/supabase/client'

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const supabase = createClient()

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: String(form.get('name')),
        email: String(form.get('email')),
        phone: String(form.get('phone') || '') || null,
        address_line1: String(form.get('address1')),
        address_line2: String(form.get('address2') || '') || null,
        city: String(form.get('city')),
        postcode: String(form.get('postcode')),
        country: String(form.get('country')),
        subtotal,
        total: subtotal,
      })
      .select()
      .single()

    if (orderError || !order) {
      setError('Something went wrong placing your order. Please try again.')
      setSubmitting(false)
      return
    }

    const { error: itemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id: order.id,
        cigar_slug: item.cigarSlug,
        name: item.name,
        unit_price: item.priceValue,
        quantity: item.quantity,
      }))
    )

    if (itemsError) {
      setError('Something went wrong placing your order. Please try again.')
      setSubmitting(false)
      return
    }

    clear()
    router.push(`/checkout/confirmation?order=${order.id}`)
  }

  if (items.length === 0) {
    return (
      <main className="py-24">
        <Container measure>
          <h1 className="text-display text-ink font-serif">Nothing to check out.</h1>
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
        </Container>
      </main>
    )
  }

  return (
    <main className="py-24">
      <Container measure>
        <h1 className="text-display text-ink font-serif">Delivery details.</h1>
        <p className="text-lead text-ink-muted mt-4">
          This is a prototype — no payment is actually taken. Placing an order below simulates a
          completed, paid order.
        </p>

        <Card className="mt-10 flex items-center justify-between">
          <p className="text-body text-ink-muted">
            {items.reduce((sum, i) => sum + i.quantity, 0)} item
            {items.reduce((sum, i) => sum + i.quantity, 0) === 1 ? '' : 's'}
          </p>
          <p className="text-title text-ink font-serif">£{subtotal.toFixed(0)}</p>
        </Card>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <Card className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="name">
                <Input id="name" name="name" required autoComplete="name" />
              </Field>
              <Field label="Email" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </Field>
            </div>
            <Field label="Phone (optional)" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" autoComplete="tel" />
            </Field>
            <Field label="Address line 1" htmlFor="address1">
              <Input id="address1" name="address1" required autoComplete="address-line1" />
            </Field>
            <Field label="Address line 2 (optional)" htmlFor="address2">
              <Input id="address2" name="address2" autoComplete="address-line2" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="City" htmlFor="city">
                <Input id="city" name="city" required autoComplete="address-level2" />
              </Field>
              <Field label="Postcode" htmlFor="postcode">
                <Input id="postcode" name="postcode" required autoComplete="postal-code" />
              </Field>
              <Field label="Country" htmlFor="country">
                <Input
                  id="country"
                  name="country"
                  required
                  autoComplete="country-name"
                  defaultValue="United Kingdom"
                />
              </Field>
            </div>
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="text-body text-ink font-medium">Payment</h2>
            <div className="border-line bg-sunken rounded-control border border-dashed p-4">
              <p className="text-caption text-ink-muted">
                Demo payment — card details aren&apos;t collected here. Placing the order below
                marks it as paid.
              </p>
            </div>
          </Card>

          {error && (
            <Card className="border-danger bg-danger-wash">
              <p className="text-body text-danger">{error}</p>
            </Card>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Placing order…' : `Place order (demo) — £${subtotal.toFixed(0)}`}
          </Button>
        </form>
      </Container>
    </main>
  )
}
