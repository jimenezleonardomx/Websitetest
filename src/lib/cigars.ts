export type Cigar = {
  slug: string
  name: string
  brand: string
  origin: string
  wrapper: string
  binder: string
  filler: string
  length: string
  ringGauge: number
  strength: 'Mild' | 'Mild-Medium' | 'Medium' | 'Medium-Full' | 'Full'
  price: string
  priceValue: number
  flavor: string[]
  summary: string
  tastingNotes: string
}

export const CIGARS: Cigar[] = [
  {
    slug: 'cohiba-robusto',
    name: 'Cohiba Robusto',
    brand: 'Cohiba',
    origin: 'Cuba',
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: 'Cuban',
    length: '4 7/8"',
    ringGauge: 50,
    strength: 'Medium-Full',
    price: '£45',
    priceValue: 45,
    flavor: ['Nutty', 'Earthy', 'Cocoa'],
    summary: 'The house standard-bearer — dense, earthy, and built to age.',
    tastingNotes:
      'Opens with roasted nuts and a light pepper note that settles within the first inch. The middle third brings dried fig and leather, with a cocoa finish that lingers. A cigar that rewards patience — both in the smoking and in the years it spends resting in the humidor first.',
  },
  {
    slug: 'montecristo-no-2',
    name: 'Montecristo No. 2',
    brand: 'Montecristo',
    origin: 'Cuba',
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: 'Cuban',
    length: '6 1/8"',
    ringGauge: 52,
    strength: 'Medium',
    price: '£38',
    priceValue: 38,
    flavor: ['Cedar', 'Citrus', 'Grain'],
    summary: 'A torpedo shape that draws in cedar and a clean, dry finish.',
    tastingNotes:
      'Cedar and toasted grain up front, mellowing into a smooth, dry-finished smoke with faint citrus on the retrohale. Consistent from light to nub — the reason it has stayed a shop regular for decades.',
  },
  {
    slug: 'partagas-serie-d-no-4',
    name: 'Partagás Serie D No. 4',
    brand: 'Partagás',
    origin: 'Cuba',
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: 'Cuban',
    length: '4 7/8"',
    ringGauge: 50,
    strength: 'Full',
    price: '£42',
    priceValue: 42,
    flavor: ['Pepper', 'Coffee', 'Leather'],
    summary: 'Full-bodied and peppery, built for smokers who want weight.',
    tastingNotes:
      'Bold from the first draw — black pepper, char, and dark coffee, with a leathery core that holds through to the band. Not a cigar for a light afternoon; this is the one to reach for after dinner.',
  },
  {
    slug: 'padron-1964-anniversary',
    name: 'Padrón 1964 Anniversary',
    brand: 'Padrón',
    origin: 'Nicaragua',
    wrapper: 'Nicaraguan Maduro',
    binder: 'Nicaraguan',
    filler: 'Nicaraguan',
    length: '5 1/2"',
    ringGauge: 52,
    strength: 'Full',
    price: '£29',
    priceValue: 29,
    flavor: ['Chocolate', 'Coffee', 'Spice'],
    summary: 'Our best-selling New World box — chocolate, coffee, and spice.',
    tastingNotes:
      'Rich chocolate and espresso from the first third, deepening into dried cherry and a warm baking-spice finish. Consistently one of the best-value boxes we carry, and the one we hand new customers first.',
  },
  {
    slug: 'arturo-fuente-hemingway-classic',
    name: 'Arturo Fuente Hemingway Classic',
    brand: 'Arturo Fuente',
    origin: 'Dominican Republic',
    wrapper: 'Cameroon',
    binder: 'Dominican',
    filler: 'Dominican',
    length: '6 1/8"',
    ringGauge: 44,
    strength: 'Mild-Medium',
    price: '£22',
    priceValue: 22,
    flavor: ['Cream', 'Cedar', 'Almond'],
    summary: 'The easy afternoon smoke — soft, creamy, gone too quickly.',
    tastingNotes:
      'A gentle cigar built for a first-timer or a quiet afternoon. Cream and toasted almond dominate early, with a light cedar note that carries through to a clean, short finish.',
  },
  {
    slug: 'h-upmann-no-2',
    name: 'H. Upmann No. 2',
    brand: 'H. Upmann',
    origin: 'Cuba',
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: 'Cuban',
    length: '6 1/8"',
    ringGauge: 52,
    strength: 'Medium',
    price: '£40',
    priceValue: 40,
    flavor: ['Wood', 'Coffee', 'Spice'],
    summary: 'A pyramid shape with a slow build from wood to spice.',
    tastingNotes:
      'Starts dry and woody, picking up roasted coffee through the second third and finishing with a gentle white-pepper spice. Even-burning and reliable, box after box.',
  },
]

export function getCigar(slug: string) {
  return CIGARS.find((cigar) => cigar.slug === slug)
}
