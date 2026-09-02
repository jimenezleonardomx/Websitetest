import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'

const PIECES = [
  {
    title: 'Design tokens',
    body: 'src/app/tokens.css holds every color, size and shadow. Components reference them, never raw values.',
  },
  {
    title: 'Shared contract',
    body: 'src/lib/types.ts is the boundary between frontend and backend work. Change it in its own PR.',
  },
  {
    title: 'Project skill',
    body: '.claude/skills/project-ui teaches both agents the same rules. It ships with the repo.',
  },
  {
    title: 'CI gate',
    body: 'Format, lint, types and build run on every PR, so style cannot drift quietly.',
  },
]

export default function Home() {
  return (
    <main className="py-24">
      <Container>
        <p className="text-caption text-accent font-medium tracking-wide uppercase">
          Scaffold ready
        </p>
        <h1 className="max-w-measure text-display text-ink md:text-hero mt-4">
          One repo, two people, one house style.
        </h1>
        <p className="max-w-measure text-lead text-ink-muted mt-6">
          Everything that keeps the two of you consistent is a committed file, so both Claude Code
          agents read the same rules on day one. Start by editing this page.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button>Get started</Button>
          <Button variant="secondary">Read CLAUDE.md</Button>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2">
          {PIECES.map((piece) => (
            <Card key={piece.title}>
              <h2 className="text-title text-ink">{piece.title}</h2>
              <p className="text-body text-ink-muted mt-2">{piece.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  )
}
