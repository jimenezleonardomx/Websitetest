'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { createClient } from '@/lib/supabase/client'

type ConfirmedOrder = {
  id: string
  customer_name: string
  email: string
  address_line1: string
  address_line2: string | null
  city: string
  postcode: string
  country: string
  total: number
  order_items: { name: string; unit_price: number; quantity: number }[]
}

function ConfirmationContent() {
  const orderId = useSearchParams().get('order')
  const [order, setOrder] = useState<ConfirmedOrder | null>(null)
  const [status, setStatus] = useState<'loading' | 'found' | 'not-found'>(
    orderId ? 'loading' : 'not-found'
  )

  useEffect(() => {
    if (!orderId) return
    const supabase = createClient()
    supabase
      .from('orders')
      .select(
        'id, customer_name, email, address_line1, address_line2, city, postcode, country, total, order_items(name, unit_price, quantity)'
      )
      .eq('id', orderId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setStatus('not-found')
          return
        }
        setOrder(data as ConfirmedOrder)
        setStatus('found')
      })
  }, [orderId])

  if (status === 'loading') {
    return (
      <Card className="mt-10">
        <p className="text-body text-ink-muted">Loading your order…</p>
      </Card>
    )
  }

  if (status === 'not-found' || !order) {
    return (
      <Card className="mt-10">
        <p className="text-body text-ink">We couldn&apos;t find that order.</p>
        <p className="text-body text-ink-muted mt-2">
          <Link href="/cigars" className="text-accent font-medium">
            Back to the range
          </Link>
        </p>
      </Card>
    )
  }

  return (
    <>
      <Card className="mt-10 flex flex-col gap-4">
        <div className="border-line flex flex-col gap-2 border-b pb-4">
          <p className="text-caption text-ink-muted tracking-wide uppercase">Order</p>
          <p className="text-body text-ink font-mono">{order.id}</p>
        </div>
        {order.order_items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-body text-ink">
              {item.quantity} × {item.name}
            </p>
            <p className="text-body text-ink-muted">
              £{(item.unit_price * item.quantity).toFixed(0)}
            </p>
          </div>
        ))}
        <div className="border-line flex items-center justify-between border-t pt-4">
          <p className="text-body text-ink font-medium">Total</p>
          <p className="text-title text-ink font-serif">£{order.total.toFixed(0)}</p>
        </div>
      </Card>

      <Card className="mt-6">
        <p className="text-caption text-ink-muted tracking-wide uppercase">Delivering to</p>
        <p className="text-body text-ink mt-2">{order.customer_name}</p>
        <p className="text-body text-ink-muted">{order.address_line1}</p>
        {order.address_line2 && <p className="text-body text-ink-muted">{order.address_line2}</p>}
        <p className="text-body text-ink-muted">
          {order.city}, {order.postcode}
        </p>
        <p className="text-body text-ink-muted">{order.country}</p>
        <p className="text-body text-ink-muted mt-2">
          A confirmation has been sent to {order.email}.
        </p>
      </Card>

      <Link href="/cigars">
        <Button className="mt-8 w-full" variant="secondary">
          Continue browsing
        </Button>
      </Link>
    </>
  )
}

export default function CheckoutConfirmationPage() {
  return (
    <main className="py-24">
      <Container measure>
        <p className="text-caption text-accent font-medium tracking-wide uppercase">Thank you</p>
        <h1 className="text-display text-ink mt-4 font-serif">Your order is confirmed.</h1>
        <p className="text-lead text-ink-muted mt-4">
          We&apos;ll have it ready to leave the humidor room shortly.
        </p>

        <Suspense
          fallback={
            <Card className="mt-10">
              <p className="text-body text-ink-muted">Loading your order…</p>
            </Card>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </Container>
    </main>
  )
}
