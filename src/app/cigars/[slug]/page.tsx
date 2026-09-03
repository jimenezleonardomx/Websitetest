import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CigarHero } from '@/components/cigar-hero'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { CIGARS, getCigar } from '@/lib/cigars'

export function generateStaticParams() {
  return CIGARS.map((cigar) => ({ slug: cigar.slug }))
}

const DETAILS_ORDER = ['origin', 'wrapper', 'binder', 'filler'] as const
const DETAIL_LABELS: Record<(typeof DETAILS_ORDER)[number], string> = {
  origin: 'Country',
  wrapper: 'Wrapper',
  binder: 'Binder',
  filler: 'Filler',
}

export default async function CigarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cigar = getCigar(slug)

  if (!cigar) notFound()

  return (
    <main className="py-24">
      <Container measure>
        <Link href="/cigars" className="text-body text-ink-muted hover:text-ink">
          ← Back to the range
        </Link>

        <CigarHero cigar={cigar} />

        <h2 className="text-title text-ink mt-16 font-serif">Tasting note</h2>
        <p className="text-body text-ink-muted mt-4">{cigar.tastingNotes}</p>

        <h2 className="text-title text-ink mt-16 font-serif">Details</h2>
        <Card className="mt-4">
          <dl className="grid gap-6 sm:grid-cols-2">
            {DETAILS_ORDER.map((key) => (
              <div key={key}>
                <dt className="text-caption text-ink-muted tracking-wide uppercase">
                  {DETAIL_LABELS[key]}
                </dt>
                <dd className="text-body text-ink mt-1">{cigar[key]}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Container>
    </main>
  )
}
