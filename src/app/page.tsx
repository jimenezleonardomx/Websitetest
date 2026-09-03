import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

const HIGHLIGHTS = [
  {
    title: 'Aged Havanas',
    body: 'A rotating selection of Cuban cigars rested in our cellar humidor for years before they reach the shelf.',
  },
  {
    title: 'New World selects',
    body: 'Hand-picked boxes from Nicaragua, the Dominican Republic and beyond, chosen by taste, not by name.',
  },
  {
    title: 'The humidor room',
    body: 'A private, temperature-held room where regulars keep their own boxes between visits.',
  },
  {
    title: 'Advice, not upselling',
    body: 'Staff who smoke what they sell, and will point you to something cheaper if it suits you better.',
  },
]

export default function Home() {
  return (
    <main className="py-24">
      <Container>
        <p className="text-caption text-accent font-medium tracking-wide uppercase">
          Mount Street, London
        </p>
        <h1 className="max-w-measure text-display text-ink md:text-hero mt-4 font-serif">
          Fine Havana cigars, kept the old way.
        </h1>
        <p className="max-w-measure text-lead text-ink-muted mt-6">
          Sautter has traded in Cuban and New World cigars from the same corner of Mayfair for two
          generations. Come in, take your time, and leave with something worth the wait.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button>Browse the cigars</Button>
          <Button variant="secondary">Visit the shop</Button>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
            <Card key={item.title}>
              <h2 className="text-title text-ink font-serif">{item.title}</h2>
              <p className="text-body text-ink-muted mt-2">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  )
}
