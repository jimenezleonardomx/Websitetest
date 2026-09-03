'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem } from '@/lib/types'

const STORAGE_KEY = 'sautter-cart'

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (cigarSlug: string) => void
  setQuantity: (cigarSlug: string, quantity: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // One-time read of localStorage on mount. Starting from an empty cart on
    // both server and first client render avoids a hydration mismatch; this
    // effect then syncs in whatever was actually saved.
    let restored: CartItem[] = []
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) restored = JSON.parse(raw)
    } catch {
      // Corrupt or inaccessible storage -- start with an empty cart.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial state from localStorage, not a derived value
    setItems(restored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    setItems((current) => {
      const existing = current.find((i) => i.cigarSlug === item.cigarSlug)
      if (existing) {
        return current.map((i) =>
          i.cigarSlug === item.cigarSlug ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...current, { ...item, quantity }]
    })
  }

  function removeItem(cigarSlug: string) {
    setItems((current) => current.filter((i) => i.cigarSlug !== cigarSlug))
  }

  function setQuantity(cigarSlug: string, quantity: number) {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.cigarSlug !== cigarSlug)
        : current.map((i) => (i.cigarSlug === cigarSlug ? { ...i, quantity } : i))
    )
  }

  function clear() {
    setItems([])
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceValue * i.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
