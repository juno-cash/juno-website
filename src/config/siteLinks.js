export const ROUTES = Object.freeze({
  HOME: '/',
  GET_STARTED: '/get-started',
  TECHNOLOGY: '/technology',
  FAQ: '/faq',
})

export const HASH_LINKS = Object.freeze({
  TECHNOLOGY_SECTION: '#technology',
})

export const PLACEHOLDER_LINKS = Object.freeze({
  DEFAULT: '#',
})

export const EXTERNAL_LINKS = Object.freeze({
  JUNO_GITHUB: 'https://github.com/juno-cash/junocash',
  JUNO_RELEASES: 'https://github.com/juno-cash/junocash/releases',
  BLOCK_EXPLORER: 'https://junocash.dedoo.xyz',
  ORCHARD_SPEC: 'https://zips.z.cash/protocol/protocol.pdf',
  HALO2_BOOK: 'https://zcash.github.io/halo2/',
  HALO_RECURSIVE: 'https://eprint.iacr.org/2019/1021',
  RANDOMX: 'https://github.com/tevador/RandomX',
})

export const NAV_LINKS = Object.freeze([
  { label: 'Home', pageHref: ROUTES.HOME },
  { label: 'Technology', pageHref: ROUTES.TECHNOLOGY },
  { label: 'FAQ', pageHref: ROUTES.FAQ },
])

export const INTERNAL_ROUTE_PATHS = Object.freeze([ROUTES.HOME, ROUTES.GET_STARTED, ROUTES.TECHNOLOGY, ROUTES.FAQ])

export const HEADER_NAV_CONFIG = Object.freeze({
  brandHref: ROUTES.HOME,
  action: {
    label: 'Get Started',
    href: ROUTES.GET_STARTED,
  },
})

export const HOME_LINK_CONFIG = Object.freeze({
  heroPrimary: {
    label: 'Get Started',
    href: ROUTES.GET_STARTED,
  },
  heroSecondary: {
    label: 'Read Whitepaper',
    href: HASH_LINKS.TECHNOLOGY_SECTION,
  },
})

export const GET_STARTED_LINK_CONFIG = Object.freeze({
  pathways: {
    runFullNode: EXTERNAL_LINKS.JUNO_RELEASES,
    getWallet: EXTERNAL_LINKS.JUNO_GITHUB,
    startMining: EXTERNAL_LINKS.JUNO_GITHUB,
  },
  setup: {
    releases: {
      label: 'View releases on GitHub',
      href: EXTERNAL_LINKS.JUNO_RELEASES,
    },
  },
  acquire: {
    mineYourself: EXTERNAL_LINKS.JUNO_GITHUB,
    acceptPayments: EXTERNAL_LINKS.JUNO_GITHUB,
  },
  learnMore: {
    technology: `${ROUTES.HOME}${HASH_LINKS.TECHNOLOGY_SECTION}`,
    faq: ROUTES.FAQ,
    blockExplorer: EXTERNAL_LINKS.BLOCK_EXPLORER,
    discord: PLACEHOLDER_LINKS.DEFAULT,
  },
})

export const TECHNOLOGY_RESOURCE_LINK_CONFIG = Object.freeze({
  junoWhitepaper: EXTERNAL_LINKS.JUNO_GITHUB,
  junoGithub: EXTERNAL_LINKS.JUNO_GITHUB,
  orchardSpecification: EXTERNAL_LINKS.ORCHARD_SPEC,
  halo2Book: EXTERNAL_LINKS.HALO2_BOOK,
  haloRecursivePaper: EXTERNAL_LINKS.HALO_RECURSIVE,
  randomX: EXTERNAL_LINKS.RANDOMX,
})

export const FOOTER_LINK_COLUMNS = Object.freeze([
  {
    title: 'Resources',
    links: [
      { label: 'Get Started', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'Technology', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'Mining Guide', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'Whitepaper', href: PLACEHOLDER_LINKS.DEFAULT },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'Telegram', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'X (Twitter)', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'GitHub', href: PLACEHOLDER_LINKS.DEFAULT },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Releases', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'Explorer (dedoo)', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'JunoCash SDK', href: PLACEHOLDER_LINKS.DEFAULT },
      { label: 'GPG Key', href: PLACEHOLDER_LINKS.DEFAULT },
    ],
  },
])
