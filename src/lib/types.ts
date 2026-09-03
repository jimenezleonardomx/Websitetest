/* ---------------------------------------------------------------------------
 * THE CONTRACT.
 *
 * This file is the boundary between the two of us. Frontend work and backend
 * work can run in parallel for as long as both sides agree on what is here.
 *
 * Changing a type in this file is a breaking change for the other person.
 * Rule: types.ts changes get their own small PR, reviewed by both, merged
 * FIRST -- before the code that depends on them.
 * ------------------------------------------------------------------------ */

export type Id = string

/** Shape returned by every API route, so error handling is written once. */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError }

export type ApiError = {
  /** Stable, machine-readable. Never show this to a user. */
  code: 'unauthorized' | 'not_found' | 'invalid_input' | 'conflict' | 'server_error'
  /** Human-readable, safe to display. */
  message: string
}

export type Profile = {
  id: Id
  displayName: string
  avatarUrl: string | null
  createdAt: string
}

/* Add shared domain types below. Keep them alphabetical. */

export type CartItem = {
  cigarSlug: string
  name: string
  /** Display string, e.g. "£45" -- mirrors Cigar.price. */
  price: string
  priceValue: number
  quantity: number
}

export type Order = {
  id: Id
  createdAt: string
  status: OrderStatus
  customerName: string
  email: string
  phone: string | null
  addressLine1: string
  addressLine2: string | null
  city: string
  postcode: string
  country: string
  subtotal: number
  total: number
  notes: string | null
  items: OrderItem[]
}

export type OrderItem = {
  id: Id
  cigarSlug: string
  name: string
  unitPrice: number
  quantity: number
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled'
