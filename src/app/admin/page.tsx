'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { OrderStatusBadge } from '@/components/ui/order-status-badge'
import { createClient } from '@/lib/supabase/client'
import type { OrderStatus } from '@/lib/types'

type OrderItemRow = {
  id: string
  name: string
  unit_price: number
  quantity: number
}

type OrderRow = {
  id: string
  created_at: string
  status: OrderStatus
  customer_name: string
  email: string
  phone: string | null
  address_line1: string
  address_line2: string | null
  city: string
  postcode: string
  country: string
  total: number
  order_items: OrderItemRow[]
}

const FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Cancelled', value: 'cancelled' },
]

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'paid', 'shipped', 'cancelled']

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [orders, setOrders] = useState<OrderRow[] | null>(null)
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login')
        return
      }
      setAuthed(true)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/admin/login')
    })

    return () => subscription.subscription.unsubscribe()
  }, [router])

  useEffect(() => {
    if (!authed) return
    const supabase = createClient()
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders((data as OrderRow[] | null) ?? []))
  }, [authed])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    setOrders((current) =>
      current ? current.map((o) => (o.id === orderId ? { ...o, status } : o)) : current
    )
    const supabase = createClient()
    await supabase.from('orders').update({ status }).eq('id', orderId)
  }

  const filtered = useMemo(() => {
    if (!orders) return []
    return filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  }, [orders, filter])

  const stats = useMemo(() => {
    if (!orders) return null
    const revenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)
    return {
      count: orders.length,
      revenue,
      awaitingShipment: orders.filter((o) => o.status === 'paid').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
    }
  }, [orders])

  if (authed === null || orders === null) {
    return (
      <main className="py-24">
        <Container>
          <p className="text-body text-ink-muted">Loading the dashboard…</p>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-16">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-display text-ink font-serif">Orders</h1>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        {stats && (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="text-center">
              <p className="text-caption text-ink-muted tracking-wide uppercase">Orders</p>
              <p className="text-title text-ink mt-1 font-serif">{stats.count}</p>
            </Card>
            <Card className="text-center">
              <p className="text-caption text-ink-muted tracking-wide uppercase">Revenue</p>
              <p className="text-title text-ink mt-1 font-serif">£{stats.revenue.toFixed(0)}</p>
            </Card>
            <Card className="text-center">
              <p className="text-caption text-ink-muted tracking-wide uppercase">
                Awaiting shipment
              </p>
              <p className="text-title text-accent mt-1 font-serif">{stats.awaitingShipment}</p>
            </Card>
            <Card className="text-center">
              <p className="text-caption text-ink-muted tracking-wide uppercase">Shipped</p>
              <p className="text-title text-ink mt-1 font-serif">{stats.shipped}</p>
            </Card>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={
                filter === f.value
                  ? 'rounded-control bg-accent text-accent-ink text-caption px-3 py-1.5 font-medium'
                  : 'rounded-control border-line text-ink-muted hover:border-line-strong text-caption border px-3 py-1.5 font-medium'
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="mt-6">
            <p className="text-body text-ink">No orders here yet.</p>
            <p className="text-body text-ink-muted mt-2">
              Orders placed through the site will show up as soon as someone checks out.
            </p>
          </Card>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            {filtered.map((order) => {
              const expanded = expandedId === order.id
              const itemCount = order.order_items.reduce((sum, i) => sum + i.quantity, 0)

              return (
                <Card key={order.id} className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : order.id)}
                    className="flex flex-col items-start gap-4 text-left sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-body text-ink font-medium">{order.customer_name}</p>
                      <p className="text-caption text-ink-muted mt-1">
                        {formatDate(order.created_at)} · {itemCount} item
                        {itemCount === 1 ? '' : 's'} ·{' '}
                        <span className="font-mono">{order.id.slice(0, 8)}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-title text-ink font-serif">£{order.total.toFixed(0)}</p>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </button>

                  {expanded && (
                    <div className="border-line flex flex-col gap-5 border-t pt-4">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="text-caption text-ink-muted tracking-wide uppercase">
                            Items
                          </p>
                          <div className="mt-2 flex flex-col gap-1.5">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between">
                                <p className="text-body text-ink">
                                  {item.quantity} × {item.name}
                                </p>
                                <p className="text-body text-ink-muted">
                                  £{(item.unit_price * item.quantity).toFixed(0)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-caption text-ink-muted tracking-wide uppercase">
                            Deliver to
                          </p>
                          <p className="text-body text-ink mt-2">{order.address_line1}</p>
                          {order.address_line2 && (
                            <p className="text-body text-ink-muted">{order.address_line2}</p>
                          )}
                          <p className="text-body text-ink-muted">
                            {order.city}, {order.postcode}
                          </p>
                          <p className="text-body text-ink-muted">{order.country}</p>
                          <p className="text-body text-ink-muted mt-2">{order.email}</p>
                          {order.phone && <p className="text-body text-ink-muted">{order.phone}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`status-${order.id}`}
                          className="text-caption text-ink-muted tracking-wide uppercase"
                        >
                          Status
                        </label>
                        <select
                          id={`status-${order.id}`}
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className="border-line bg-surface text-body text-ink rounded-control hover:border-line-strong h-9 border px-2"
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option[0].toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </Container>
    </main>
  )
}
