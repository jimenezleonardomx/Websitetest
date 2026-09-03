import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

const RANGES = [
  {
    title: 'Aged Havanas',
    body: 'Cuban boxes rested for a minimum of five years in our cellar before sale, bought in small parcels rather than bulk.',
  },
  {
    title: 'Current release Cuba',
    body: 'This season’s regular-production Havanas, kept at proper humidity from the moment they arrive.',
  },
  {
    title: 'New World',
    body: 'Nicaragua, the Dominican Republic and Honduras, chosen one box at a time by staff who smoke them first.',
  },
  {
    title: 'Accessories',
    body: 'Cutters, lighters, ashtrays and travel cases — the ordinary tools, made properly.',
  },
]

export default function CigarsPage() {
  return (
    <main className="py-24">
      <Container>
        <p className="text-caption text-accent font-medium tracking-wide uppercase">The range</p>
        <h1 className="max-w-measure text-display text-ink mt-4 font-serif">
          What we keep in the humidor.
        </h1>
        <p className="max-w-measure text-lead text-ink-muted mt-6">
          Stock turns over with the seasons, so the exact boxes on the shelf change. What doesn’t
          change is where we buy from and how long we’re willing to wait before selling it.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {RANGES.map((range) => (
            <Card key={range.title}>
              <h2 className="text-title text-ink font-serif">{range.title}</h2>
              <p className="text-body text-ink-muted mt-2">{range.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  )
}
