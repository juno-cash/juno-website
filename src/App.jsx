import { useEffect, useMemo, useState } from 'react'
import './App.css'

const NAV_LINKS = [
  { href: '#technology', label: 'Technology' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#mining', label: 'Mining' },
  { href: '#faq', label: 'FAQ' },
]

const SPARKLES = [
  { top: '15%', left: '20%', size: 2, delay: '0s' },
  { top: '25%', left: '80%', size: 3, delay: '1s' },
  { top: '70%', left: '10%', size: 2, delay: '2.5s' },
  { top: '60%', left: '90%', size: 4, delay: '0.5s' },
]

const HERO_STATS = [
  { label: 'Privacy', value: '100% Shielded' },
  { label: 'Block Time', value: '60 Seconds' },
  { label: 'Setup', value: 'Trustless (Halo 2)' },
  { label: 'Mining', value: 'CPU (RandomX)' },
]

const FEATURE_CARDS = [
  {
    title: 'Fair Launch',
    description:
      '100% to miners. No premine. No founder tax. Zero extraction. Pure proof of work.',
    icon: 'fairLaunch',
  },
  {
    title: 'CPU Mining',
    description:
      'RandomX means anyone can participate. No ASIC cartels controlling the hashrate.',
    icon: 'cpuMining',
  },
  {
    title: 'Auditable Supply',
    description:
      "New coins minted visibly, then irreversibly shielded. 21 million cap. Bitcoin's proven policy.",
    icon: 'auditableSupply',
  },
  {
    title: 'No Trusted Setup',
    description:
      'Halo 2 proofs eliminate setup ceremonies. No toxic waste. No trust assumptions.',
    icon: 'noTrustedSetup',
  },
]

const TECHNOLOGY_STATS = [
  { value: '2-5s', label: 'Signing Time' },
  { value: '<100ms', label: 'Verification' },
  { value: 'Halo 2', label: 'Proof System' },
]

const COMPARISON_ROWS = [
  {
    feature: 'Privacy Model',
    juno: 'Mandatory (100%)',
    zcash: 'Optional (transparent + shielded)',
    monero: 'Private by default',
  },
  {
    feature: 'Transaction Graph',
    juno: 'None (shielded pool)',
    zcash: 'Visible for t-addresses',
    monero: 'Obfuscated',
  },
  {
    feature: 'Trusted Setup',
    juno: 'None (Halo 2)',
    zcash: 'Historical pools (Sprout/Sapling)',
    monero: 'None',
  },
  {
    feature: 'Mining',
    juno: 'CPU (RandomX)',
    zcash: 'Equihash (ASIC)',
    monero: 'CPU (RandomX)',
  },
  {
    feature: 'Premine / Tax',
    juno: '0%',
    zcash: 'Consensus funding stream',
    monero: '0% premine',
  },
]

const FAQS = [
  {
    question: 'Why mandatory privacy?',
    answer:
      "Optional privacy does not produce a strong anonymity set. By shielding all transfers, Juno Cash keeps every user's transaction graph private by default.",
  },
  {
    question: 'Is the supply auditable?',
    answer:
      'Yes. New coins are minted visibly in coinbase rewards and then permanently moved into the shielded pool, so total issuance can be audited while balances stay private.',
  },
  {
    question: 'How do I mine Juno Cash?',
    answer:
      'Juno Cash uses RandomX, a CPU-focused mining algorithm, so modern commodity hardware can participate without specialized ASIC equipment.',
  },
]

const FOOTER_COLUMNS = [
  {
    title: 'Resources',
    links: ['Get Started', 'Technology', 'Mining Guide', 'Whitepaper'],
  },
  {
    title: 'Community',
    links: ['Discord', 'Telegram', 'X (Twitter)', 'GitHub'],
  },
  {
    title: 'Developers',
    links: ['Releases', 'Explorer (dedoo)', 'JunoCash SDK', 'GPG Key'],
  },
]

function Icon({ type }) {
  const classes = 'w-10 h-10'

  if (type === 'fairLaunch') {
    return (
      <svg className={classes} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="18" width="10" height="2" fill="var(--accent)" opacity="0.6" />
        <rect x="22" y="18" width="10" height="2" fill="var(--accent)" opacity="0.6" />
        <line x1="20" y1="5" x2="20" y2="35" stroke="var(--accent)" strokeWidth="1.5" opacity="0.8" />
        <circle cx="13" cy="14" r="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <circle cx="27" cy="14" r="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <line x1="8" y1="18" x2="13" y2="14" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        <line x1="18" y1="18" x2="13" y2="14" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        <line x1="22" y1="18" x2="27" y2="14" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        <line x1="32" y1="18" x2="27" y2="14" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
      </svg>
    )
  }

  if (type === 'cpuMining') {
    return (
      <svg className={classes} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="28" height="18" rx="1" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <line x1="6" y1="24" x2="34" y2="24" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        <rect x="12" y="30" width="16" height="1.5" rx="0.75" fill="var(--accent)" opacity="0.6" />
        <line x1="20" y1="28" x2="20" y2="30" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
        <circle cx="14" cy="16" r="1" fill="var(--accent)" opacity="0.8" />
        <circle cx="18" cy="16" r="1" fill="var(--accent)" opacity="0.8" />
        <circle cx="22" cy="16" r="1" fill="var(--accent)" opacity="0.8" />
      </svg>
    )
  }

  if (type === 'auditableSupply') {
    return (
      <svg className={classes} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="6" height="12" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <rect x="17" y="14" width="6" height="18" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <rect x="26" y="8" width="6" height="24" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
        <line x1="6" y1="33" x2="34" y2="33" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
      </svg>
    )
  }

  return (
    <svg className={classes} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="8" x2="20" y2="32" stroke="var(--accent)" strokeWidth="1.5" opacity="0.7" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="var(--accent)" strokeWidth="1.5" opacity="0.7" />
      <line x1="13" y1="13" x2="27" y2="27" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
      <line x1="27" y1="13" x2="13" y2="27" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="20" r="3" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.8" />
    </svg>
  )
}

function SparkleField({ parallax }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] orb-one blur-[120px] rounded-full"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] orb-two blur-[150px] rounded-full" />

      {SPARKLES.map((sparkle) => (
        <div
          key={`${sparkle.top}-${sparkle.left}`}
          className="sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
    </div>
  )
}

function HeaderNav({ theme, onToggleTheme }) {
  return (
    <nav className="site-nav fixed w-full z-50 top-0 left-0 border-b">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2 h-2 rounded-full site-dot group-hover:scale-125 transition-transform" />
          <span className="serif text-xl sm:text-2xl tracking-wide brand-mark group-hover:opacity-85 transition-opacity italic">
            Juno
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 mono text-xs tracking-widest muted uppercase">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link transition-all">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="themeToggle"
            className="theme-toggle p-2 rounded-full"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
          >
            <svg
              id="sunIcon"
              className={`w-4 h-4 ${theme === 'light' ? '' : 'hidden'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg
              id="moonIcon"
              className={`w-4 h-4 ${theme === 'light' ? 'hidden' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <a href="#features" className="md:hidden px-3 py-1.5 border rounded-full mono text-[10px] uppercase action-link">
            Start
          </a>
          <a href="#features" className="hidden md:block px-6 py-2 border rounded-full mono text-xs uppercase action-link">
            Get Started
          </a>
        </div>
      </div>

      <div className="md:hidden px-5 sm:px-6 pb-3">
        <div className="mobile-nav-scroll no-scrollbar">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="mobile-nav-chip mono text-[10px] uppercase tracking-[0.18em]">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <header className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-start md:justify-center items-center text-center px-5 sm:px-6 pt-32 md:pt-20 pb-14 md:pb-0 z-10 fade-in">
      <div className="status-pill mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="mono text-[10px] uppercase tracking-widest">Mainnet Live</span>
      </div>

      <h1 className="text-[2.75rem] sm:text-6xl md:text-8xl lg:text-9xl font-light leading-[1] tracking-tight mb-7 sm:mb-8 overflow-visible max-w-6xl">
        <span className="block hero-leading">Private</span>
        <span className="block serif italic gradient-text text-glow hero-accent-line pb-2 md:pb-3">Digital Cash</span>
      </h1>

      <p className="max-w-xl mx-auto text-[15px] sm:text-lg body-muted font-light leading-relaxed mb-10 sm:mb-12 px-2">
        Every transaction shielded using zero-knowledge proofs. No transparent addresses. No exceptions.
      </p>

      <div className="flex flex-col md:flex-row gap-3 sm:gap-6 items-center w-full max-w-sm md:max-w-none">
        <a href="#features" className="btn-primary w-full md:w-auto text-center px-10 py-4 rounded-sm mono text-sm uppercase tracking-widest font-semibold">
          Get Started
        </a>
        <a href="#technology" className="btn-secondary w-full md:w-auto text-center px-10 py-4 rounded-sm mono text-sm uppercase tracking-widest">
          Read Whitepaper
        </a>
      </div>

      <div className="mt-9 grid w-full max-w-md grid-cols-2 gap-3 text-left md:hidden">
        {HERO_STATS.map((item) => (
          <div key={item.label} className="hero-mobile-stat rounded-sm border border-soft p-3">
            <div className="mono text-[10px] text-faint uppercase mb-1 tracking-[0.16em]">{item.label}</div>
            <div className="text-base serif italic stat-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 lg:bottom-12 w-full max-w-6xl mx-auto px-6 hidden md:grid grid-cols-4 gap-4 text-left border-t border-soft pt-8">
        {HERO_STATS.map((item) => (
          <div key={item.label}>
            <div className="mono text-xs text-faint uppercase mb-1">{item.label}</div>
            <div className="text-xl serif italic stat-value">{item.value}</div>
          </div>
        ))}
      </div>
    </header>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 relative z-10 section-gradient">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 md:p-12 col-span-1 md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 accent-glow rounded-full blur-[80px] group-hover:opacity-70 transition-opacity" />
            <div className="relative z-10">
              <div className="mono text-xs accent-text accent-tag inline-block px-2 py-1 rounded mb-6">Mandatory Privacy</div>
              <h3 className="text-3xl sm:text-4xl serif mb-4 heading-color">Privacy that actually works.</h3>
              <p className="body-muted leading-relaxed max-w-lg">
                Every transaction uses Orchard protocol. No transparent addresses. No unshielding. Unlike optional privacy systems where shielded
                transactions stand out, Juno Cash makes privacy the only option, strengthening protection for all users.
              </p>
            </div>
          </div>

          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className="glass-panel p-6 sm:p-8 relative group">
              <div className="mb-5 sm:mb-6 opacity-80">
                <Icon type={card.icon} />
              </div>
              <h4 className="text-[1.65rem] sm:text-2xl serif mb-3 heading-color">{card.title}</h4>
              <p className="text-sm text-dim leading-relaxed">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechnologySection() {
  return (
    <section id="technology" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Core Technology</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl serif mb-8 heading-color">Powered by Zero-Knowledge</h2>
        <p className="text-base sm:text-lg body-muted leading-relaxed mb-12 sm:mb-16">
          Zero-knowledge proofs are the cryptographic breakthrough of the decade. They let you prove something is true without revealing the
          underlying data.
          <br />
          <br />
          The crypto world uses ZKPs for scaling. We use them for their original purpose: <span className="heading-color border-b accent-border">Privacy.</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 text-center">
        {TECHNOLOGY_STATS.map((stat) => (
          <div key={stat.label} className="metric-card p-6 border rounded-sm backdrop-blur-sm">
            <div className="mono text-4xl mb-2 gradient-text font-bold">{stat.value}</div>
            <div className="text-sm text-faint uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 sm:py-32 md:py-40 flex items-center justify-center relative bg-subtle">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[600px] h-[75vw] max-h-[600px] quote-halo rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <blockquote className="quote-pulse serif text-[1.75rem] sm:text-3xl md:text-5xl italic leading-[1.2] heading-color mb-10">
          "Privacy isn't about hiding. It's about choosing who gets access to your financial information."
        </blockquote>

        <div className="flex justify-center items-center gap-4">
          <div className="h-px w-12 line-soft" />
          <p className="mono text-xs uppercase tracking-widest text-dim">Selective Disclosure via View Keys</p>
          <div className="h-px w-12 line-soft" />
        </div>
      </div>
    </section>
  )
}

function HeritageSection() {
  return (
    <section id="mining" className="py-16 sm:py-24 bg-main">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl serif mb-4 heading-color">Battle-Tested Heritage</h2>
          <p className="text-dim">Built on proven cryptographic systems, with defaults optimized for private peer-to-peer cash.</p>
        </div>

        <div className="md:hidden space-y-3">
          {COMPARISON_ROWS.map((row) => (
            <article key={row.feature} className="comparison-mobile-card border border-subtle rounded-sm p-4">
              <h3 className="mono text-[10px] uppercase tracking-[0.18em] text-faint mb-3">{row.feature}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-faint mono text-[10px] uppercase tracking-[0.14em]">Juno</span>
                  <span className="accent-text text-right">{row.juno}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-faint mono text-[10px] uppercase tracking-[0.14em]">Zcash</span>
                  <span className="text-dim text-right">{row.zcash}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-faint mono text-[10px] uppercase tracking-[0.14em]">Monero</span>
                  <span className="text-dim text-right">{row.monero}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="comparison-table w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-soft">
                <th className="py-4 px-4 mono text-xs uppercase text-faint font-normal">Feature</th>
                <th className="py-4 px-4 mono text-xs uppercase accent-text font-normal">Juno Cash</th>
                <th className="py-4 px-4 mono text-xs uppercase text-faint font-normal">Zcash</th>
                <th className="py-4 px-4 mono text-xs uppercase text-faint font-normal">Monero</th>
              </tr>
            </thead>
            <tbody className="mono text-sm">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-subtle-row transition-colors">
                  <td className="py-6 px-4 text-primary-soft">{row.feature}</td>
                  <td className="py-6 px-4 accent-text">{row.juno}</td>
                  <td className="py-6 px-4 text-dim">{row.zcash}</td>
                  <td className="py-6 px-4 text-dim">{row.monero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-elevated">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="text-3xl sm:text-4xl serif mb-12 text-center heading-color">Common Questions</h2>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-item group rounded-sm overflow-hidden">
              <summary className="flex justify-between items-center p-5 sm:p-6 cursor-pointer transition-colors list-none gap-4">
                <span className="serif text-lg sm:text-xl italic heading-color">{faq.question}</span>
                <span className="faq-arrow text-faint transition-transform">↓</span>
              </summary>
              <div className="p-5 sm:p-6 pt-0 body-muted leading-relaxed faq-answer-border">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="py-14 sm:py-20 border-t border-subtle bg-main relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <div className="serif text-2xl italic heading-color mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full site-dot" />
            Juno Cash
          </div>
          <p className="text-dim text-sm leading-relaxed mb-6">Private digital cash. Every transaction shielded. No compromises.</p>
          <div className="mono text-xs text-faint">
            © 2026 Juno Project.
            <br />
            Open Source (MIT).
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h5 className="mono text-xs uppercase tracking-widest accent-text mb-6">{column.title}</h5>
            <ul className="space-y-4 text-sm text-dim">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    document.title = 'Juno Cash | Private Digital Currency'
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setParallax(Math.min(window.scrollY * 0.06, 80))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const themeLabel = useMemo(() => (theme === 'light' ? 'dark' : 'light'), [theme])

  return (
    <div className="site-shell antialiased selection:bg-yellow-100 selection:text-black">
      <SparkleField parallax={parallax} />
      <HeaderNav theme={theme} onToggleTheme={() => setTheme(themeLabel)} />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
        <PhilosophySection />
        <HeritageSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default App
