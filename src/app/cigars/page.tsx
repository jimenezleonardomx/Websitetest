import { CigarsBrowser } from '@/components/cigars-browser'
import { Container } from '@/components/ui/container'
import { CIGARS } from '@/lib/cigars'

export default function CigarsPage() {
  return (
    <main className="py-24">
      <Container>
        <h1 className="max-w-measure text-display text-ink font-serif">
          What we keep in the humidor.
        </h1>
        <p className="max-w-measure text-lead text-ink-muted mt-6">
          Stock turns over with the seasons, so the exact boxes on the shelf change. Every one below
          is something currently on the shelf, with the same detail you&apos;d get asking in person.
        </p>

        <CigarsBrowser cigars={CIGARS} />
      </Container>
    </main>
  )
}
