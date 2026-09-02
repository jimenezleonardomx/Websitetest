import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Website',
  description: 'Rename me in src/app/layout.tsx',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
