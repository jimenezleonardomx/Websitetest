import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/lib/types'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  cancelled: 'Cancelled',
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'border border-line text-ink-muted',
  paid: 'bg-accent-wash text-accent',
  shipped: 'bg-ink text-canvas',
  cancelled: 'bg-danger-wash text-danger',
}

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'rounded-control text-caption inline-flex items-center px-2.5 py-1 font-medium',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
