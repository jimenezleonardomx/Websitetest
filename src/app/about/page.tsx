import { Container } from '@/components/ui/container'

export default function AboutPage() {
  return (
    <main className="py-24">
      <Container measure>
        <p className="text-caption text-accent font-medium tracking-wide uppercase">Our story</p>
        <h1 className="text-display text-ink mt-4 font-serif">Over fifty years on Mount Street.</h1>
        <p className="text-lead text-ink-muted mt-6">
          Sautter opened as a small tobacconist decades ago, in the same stretch of Mayfair it still
          occupies today. The rule that has carried it through since has never changed: sell what
          you&apos;d smoke yourself, and say so when you wouldn&apos;t.
        </p>
        <p className="text-body text-ink-muted mt-6">
          We buy our Havanas in small, direct parcels rather than large bulk orders, which costs
          more and moves slower — but it means we can tell you where a box has been resting and for
          how long. The New World side of the shop is chosen the same way: one box at a time, tasted
          before it&apos;s stocked.
        </p>
        <p className="text-body text-ink-muted mt-6">
          The humidor room at the back holds regulars&apos; own boxes between visits, alongside the
          shop&apos;s aged stock. If you&apos;re new to cigars, that&apos;s still the best place to
          start a conversation — no purchase required.
        </p>
      </Container>
    </main>
  )
}
