import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: 'Sautter | Fine Havana Cigars, London',
  description:
    'Sautter of Mount Street — a London cigar merchant specialising in aged and vintage Havana cigars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
