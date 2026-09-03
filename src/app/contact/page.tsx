import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

const DETAILS = [
  { label: 'Address', value: '106 Mount Street, London W1K 2TW' },
  { label: 'Phone', value: 'Add real number here' },
  { label: 'Email', value: 'Add real email here' },
  { label: 'Hours', value: 'Monday–Saturday, 10am–7pm' },
]

export default function ContactPage() {
  return (
    <main className="py-24">
      <Container measure>
        <h1 className="text-display text-ink font-serif">Visit, call, or write ahead.</h1>
        <p className="text-lead text-ink-muted mt-6">
          The shop is easiest to reach in person — come by, take a seat, and talk through what
          you&apos;re after. For anything else, here&apos;s how to find us.
        </p>

        <Card className="mt-10">
          <dl className="grid gap-6 sm:grid-cols-2">
            {DETAILS.map((detail) => (
              <div key={detail.label}>
                <dt className="text-caption text-ink-muted tracking-wide uppercase">
                  {detail.label}
                </dt>
                <dd className="text-body text-ink mt-1">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Container>
    </main>
  )
}
