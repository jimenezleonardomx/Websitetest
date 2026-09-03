import Link from 'next/link'
import { CartIndicator } from '@/components/cart-indicator'
import { Container } from '@/components/ui/container'
import { NavMenu, type NavPage } from '@/components/ui/nav-menu'
import { SautterWordmark } from '@/components/ui/sautter-wordmark'

const PAGES: NavPage[] = [
  { href: '/', label: 'Home', description: 'The house, on Mount Street' },
  { href: '/cigars', label: 'Cigars', description: 'Aged and vintage Havanas' },
  { href: '/about', label: 'About', description: 'Our story since the 1970s' },
  { href: '/contact', label: 'Contact', description: 'Visit or reach the humidor room' },
]

export function SiteHeader() {
  return (
    <header className="border-line bg-surface/80 sticky top-0 z-20 border-b backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="Sautter, home">
          <SautterWordmark />
        </Link>
        <div className="flex items-center gap-1">
          <NavMenu pages={PAGES} />
          <CartIndicator />
        </div>
      </Container>
    </header>
  )
}
