import type { Metadata } from 'next'
import { Archivo_Narrow, Fraunces } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo-narrow',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'Sautter | Fine Havana Cigars, London',
  description:
    'Sautter of Mount Street — a London cigar merchant specialising in aged and vintage Havana cigars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivoNarrow.variable} ${fraunces.variable}`}>
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
