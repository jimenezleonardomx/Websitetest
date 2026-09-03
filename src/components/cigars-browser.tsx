'use client'

import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { CigarCard } from '@/components/ui/cigar-card'
import type { Cigar } from '@/lib/cigars'
import { cn } from '@/lib/utils'

const PRICE_BANDS = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under £30', min: 0, max: 30 },
  { label: '£30–£40', min: 30, max: 40 },
  { label: 'Over £40', min: 40, max: Infinity },
] as const

function unique(values: string[]) {
  return [...new Set(values)].sort()
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-caption text-ink tracking-wide uppercase">{title}</h3>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  )
}

function toggle(set: Set<string>, value: string) {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

export function CigarsBrowser({ cigars }: { cigars: Cigar[] }) {
  const origins = useMemo(() => unique(cigars.map((c) => c.origin)), [cigars])
  const strengths = useMemo(() => unique(cigars.map((c) => c.strength)), [cigars])
  const brands = useMemo(() => unique(cigars.map((c) => c.brand)), [cigars])
  const flavors = useMemo(() => unique(cigars.flatMap((c) => c.flavor)), [cigars])

  const [selectedOrigins, setSelectedOrigins] = useState<Set<string>>(new Set())
  const [selectedStrengths, setSelectedStrengths] = useState<Set<string>>(new Set())
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set())
  const [selectedFlavors, setSelectedFlavors] = useState<Set<string>>(new Set())
  const [priceBand, setPriceBand] = useState<(typeof PRICE_BANDS)[number]>(PRICE_BANDS[0])

  const filtered = useMemo(() => {
    return cigars.filter((cigar) => {
      if (selectedOrigins.size > 0 && !selectedOrigins.has(cigar.origin)) return false
      if (selectedStrengths.size > 0 && !selectedStrengths.has(cigar.strength)) return false
      if (selectedBrands.size > 0 && !selectedBrands.has(cigar.brand)) return false
      if (selectedFlavors.size > 0 && !cigar.flavor.some((f) => selectedFlavors.has(f)))
        return false
      if (cigar.priceValue < priceBand.min || cigar.priceValue > priceBand.max) return false
      return true
    })
  }, [cigars, selectedOrigins, selectedStrengths, selectedBrands, selectedFlavors, priceBand])

  const hasActiveFilters =
    selectedOrigins.size > 0 ||
    selectedStrengths.size > 0 ||
    selectedBrands.size > 0 ||
    selectedFlavors.size > 0 ||
    priceBand !== PRICE_BANDS[0]

  function clearAll() {
    setSelectedOrigins(new Set())
    setSelectedStrengths(new Set())
    setSelectedBrands(new Set())
    setSelectedFlavors(new Set())
    setPriceBand(PRICE_BANDS[0])
  }

  return (
    <div className="mt-16 grid gap-10 md:grid-cols-[16rem_1fr]">
      <aside>
        <Card className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-title text-ink font-serif">Filter</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-caption text-accent hover:text-accent-hover font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <FilterGroup title="Location">
            {origins.map((origin) => (
              <Checkbox
                key={origin}
                id={`origin-${origin}`}
                label={origin}
                checked={selectedOrigins.has(origin)}
                onChange={() => setSelectedOrigins(toggle(selectedOrigins, origin))}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Strength">
            {strengths.map((strength) => (
              <Checkbox
                key={strength}
                id={`strength-${strength}`}
                label={strength}
                checked={selectedStrengths.has(strength)}
                onChange={() => setSelectedStrengths(toggle(selectedStrengths, strength))}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            {brands.map((brand) => (
              <Checkbox
                key={brand}
                id={`brand-${brand}`}
                label={brand}
                checked={selectedBrands.has(brand)}
                onChange={() => setSelectedBrands(toggle(selectedBrands, brand))}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Taste">
            <div className="flex flex-wrap gap-2">
              {flavors.map((flavor) => {
                const active = selectedFlavors.has(flavor)
                return (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => setSelectedFlavors(toggle(selectedFlavors, flavor))}
                    className={cn(
                      'rounded-control border-line text-caption px-3 py-1 font-medium',
                      'ease-out-soft border transition-colors duration-150',
                      active
                        ? 'bg-accent-wash border-accent text-accent'
                        : 'text-ink-muted hover:border-line-strong'
                    )}
                  >
                    {flavor}
                  </button>
                )
              })}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            {PRICE_BANDS.map((band) => (
              <label key={band.label} className="text-body text-ink-muted flex items-center gap-2">
                <input
                  type="radio"
                  name="price-band"
                  className="accent-accent h-4 w-4"
                  checked={priceBand.label === band.label}
                  onChange={() => setPriceBand(band)}
                />
                {band.label}
              </label>
            ))}
          </FilterGroup>
        </Card>
      </aside>

      <div>
        <p className="text-caption text-ink-muted mb-4">
          {filtered.length} {filtered.length === 1 ? 'cigar' : 'cigars'}
        </p>

        {filtered.length === 0 ? (
          <Card>
            <p className="text-body text-ink">No cigars match those filters.</p>
            <p className="text-body text-ink-muted mt-2">
              Try clearing a filter, or{' '}
              <button type="button" onClick={clearAll} className="text-accent font-medium">
                clear all filters
              </button>
              .
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((cigar) => (
              <CigarCard key={cigar.slug} cigar={cigar} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
