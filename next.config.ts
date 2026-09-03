import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Smooth Hosting serves plain files from public_html -- no Node.js process
  // behind it. `next build` must emit static HTML/CSS/JS into `out/`, so
  // nothing in the app can depend on a server: no Route Handlers, Server
  // Actions, middleware, or the cookie-based Supabase server client.
  output: 'export',
  // No image optimization server to call in static hosting.
  images: { unoptimized: true },
  // public_html is Apache: /about must resolve to /about/index.html.
  trailingSlash: true,
}

export default nextConfig
