import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  FOOTER_LINK_COLUMNS,
  GET_STARTED_LINK_CONFIG,
  HEADER_NAV_CONFIG,
  HOME_LINK_CONFIG,
  INTERNAL_ROUTE_PATHS,
  NAV_LINKS,
  ROUTES,
  TECHNOLOGY_RESOURCE_LINK_CONFIG,
} from './config/siteLinks'

const INTERNAL_ROUTES = new Set(INTERNAL_ROUTE_PATHS)

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

const FAQ_SECTIONS = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        question: 'What is Juno Cash?',
        answer: [
          'Juno Cash is a privacy-first cryptocurrency where every transaction is shielded using zero-knowledge proofs. Unlike other cryptocurrencies that offer optional privacy, Juno Cash enforces privacy for all transactions.',
          'There are no transparent addresses and no way to unshield coins. This means the anonymity set includes everyone on the network.',
        ],
      },
      {
        question: 'Why mandatory privacy instead of optional?',
        answer: [
          "Optional privacy does not work. When privacy is optional, most users do not enable it, which means those who do stand out. The strength of privacy depends on the size of your anonymity set. If only some transactions are private, they become easier to analyze and trace.",
          "By making every transaction shielded, Juno Cash ensures the anonymity set is everyone on the network. Your private transaction looks exactly like everyone else's.",
        ],
      },
      {
        question: 'How is Juno Cash different from Bitcoin?',
        answer: [
          "Juno Cash shares Bitcoin's monetary policy (21 million coins, 4-year halvings, proof of work) but adds mandatory privacy using zero-knowledge proofs.",
          'Every Juno Cash transaction is completely private. Sender, receiver, and amount are all hidden. Juno Cash also uses RandomX mining, which means anyone with a CPU can participate, unlike Bitcoin ASIC-dominated mining.',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    items: [
      {
        question: 'Why does financial privacy matter?',
        answer: [
          'Your bank does not broadcast your transactions. Your employer does not see your spending. Your neighbors do not know your salary. This is not secrecy. It is the normal expectation in finance.',
          'Transparent blockchains broke this expectation. With Juno Cash, you regain control over your financial data. You choose who gets access, just like with traditional banking, but without relying on a bank.',
        ],
      },
      {
        question: "Isn't privacy just for criminals?",
        answer: [
          'No. Privacy is a fundamental right and the default in traditional finance. You would not want your salary, rent payments, medical expenses, or charitable donations visible to everyone on the internet forever.',
          'Financial privacy protects individuals from criminals (who target wealthy addresses), stalkers, discriminatory pricing, and corporate surveillance. It is the same privacy you expect from your bank account.',
        ],
      },
      {
        question: 'Can I prove a transaction if I need to?',
        answer: [
          'Yes. Juno Cash has view keys that let you selectively disclose transaction details to anyone you choose: an auditor, a counterparty, a tax authority, or a family member.',
          'You control who sees your financial information and when. Privacy means choice, not absolute secrecy.',
        ],
      },
      {
        question: 'Can I unshield my coins?',
        answer: [
          "No, and that is the point. The ability to unshield creates transaction graph linkages that retroactively compromise privacy.",
          "In Juno Cash, all circulating coins are permanently shielded. This maximizes the anonymity set and ensures your privacy cannot be compromised by others' choices.",
        ],
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical',
    items: [
      {
        question: 'What are zero-knowledge proofs?',
        answer: [
          'Zero-knowledge proofs (ZKPs) are a cryptographic technique that lets you prove something is true without revealing the underlying data. For example, you can prove a transaction is valid (correct amounts, you own the coins) without revealing who sent it, who received it, or how much was transferred.',
          'ZKPs are one of the most significant cryptographic breakthroughs of the past decade. While many projects use them for scaling (zkRollups, zkEVMs), Juno Cash uses them for their original purpose: privacy.',
        ],
      },
      {
        question: 'Why do ZKPs matter for privacy?',
        answer: [
          'Traditional privacy approaches (like mixing or coin shuffling) provide limited anonymity and can often be traced with enough analysis. Zero-knowledge proofs provide cryptographic privacy. The transaction data simply is not on the blockchain to be analyzed.',
          'With ZKPs, the network can verify your transaction is valid without ever seeing the details. This is fundamentally stronger than any obfuscation technique.',
        ],
      },
      {
        question: 'What is Orchard?',
        answer: [
          'Orchard is the shielded transaction protocol that powers Juno Cash, built on the Halo 2 proof system. It represents years of research into efficient zero-knowledge proofs.',
          'Orchard transactions sign in 2-5 seconds on commodity hardware and verify in under 100 milliseconds.',
        ],
      },
      {
        question: 'What is Halo 2?',
        answer: [
          'Halo 2 is the zero-knowledge proof system that powers Orchard. It uses recursive proofs and requires no trusted setup, a major advancement over earlier systems.',
          'This means there is no toxic waste from a setup ceremony that could theoretically compromise the system.',
        ],
      },
      {
        question: 'Is there a trusted setup?',
        answer: [
          'No. Juno Cash uses Halo 2 proofs, which eliminate the need for a trusted setup ceremony.',
          'Earlier zero-knowledge systems required multi-party ceremonies that created cryptographic toxic waste. Halo 2 does not have this requirement, making it cryptographically cleaner.',
        ],
      },
      {
        question: 'Is the supply auditable?',
        answer: [
          'Yes. New coins are minted visibly in the coinbase (mining reward), then irreversibly transferred to the shielded pool before they can be spent. Since newly mined coins have no prior transaction history, this creates no privacy leak.',
          'You can verify the total supply by examining coinbase transactions, while all circulating coins remain permanently shielded.',
        ],
      },
      {
        question: 'How is Juno Cash different from other ZK projects?',
        answer: [
          'Most ZK projects today (zkSync, Starknet, Polygon zkEVM, and others) use zero-knowledge proofs for scaling, to compress transaction data and reduce costs on Ethereum.',
          'Juno Cash uses ZKPs for their original purpose: privacy. We are not a rollup or a scaling solution. We are a standalone privacy-first cryptocurrency.',
        ],
      },
    ],
  },
  {
    id: 'economics-mining',
    title: 'Economics & Mining',
    items: [
      {
        question: 'What is the total supply?',
        answer: [
          "21 million coins, the same as Bitcoin. Juno Cash uses the same proven monetary parameters: 4-year halving intervals and proof-of-work consensus. These are battle-tested parameters over 15+ years.",
        ],
      },
      {
        question: 'Is there a dev fee or founder reward?',
        answer: [
          'No. 100% of mining rewards go to miners. There is no premine, no founder allocation, and no mandatory dev tax.',
          'There is an optional donation mechanism (off by default) that miners can enable if they want to support development, but it is entirely voluntary.',
        ],
      },
      {
        question: 'How do I mine Juno Cash?',
        answer: [
          'Juno Cash uses RandomX, a CPU-friendly mining algorithm. You can mine with any modern computer. No specialized hardware required. See the Mining Guide for detailed instructions.',
        ],
      },
      {
        question: 'Why CPU mining instead of ASICs?',
        answer: [
          'ASIC mining creates several problems: only a few manufacturers produce the hardware, those manufacturers can control who gets access, the hardware is expensive (making mining exclusionary), and mining tends to concentrate in regions with cheap electricity.',
          'RandomX CPU mining means anyone with a computer can participate. This increases decentralization and makes the network more resilient against regulatory capture, manufacturer collusion, and geographic concentration.',
        ],
      },
    ],
  },
]

const LOGO_BY_THEME = {
  light: '/logos/juno-rec-black.svg',
  dark: '/logos/juno-rec-white.svg',
}

const START_PATHWAYS = [
  {
    title: 'Run a Full Node',
    description:
      'Support the decentralized network with maximum sovereignty. Includes a built-in wallet and full chain validation.',
    href: GET_STARTED_LINK_CONFIG.pathways.runFullNode,
    cta: 'Download from GitHub',
    primary: true,
    icon: 'node',
  },
  {
    title: 'Get a Wallet',
    description:
      'Use a lightweight wallet for daily private transfers. Fast setup and simple UX for regular payments.',
    href: GET_STARTED_LINK_CONFIG.pathways.getWallet,
    cta: 'Get Juno Wallet',
    primary: false,
    icon: 'wallet',
  },
  {
    title: 'Start Mining',
    description:
      'Mine Juno Cash with CPU-friendly RandomX. No specialized hardware required to participate in network security.',
    href: GET_STARTED_LINK_CONFIG.pathways.startMining,
    cta: 'Mining Guide',
    primary: false,
    icon: 'mining',
  },
]

const ACQUIRE_OPTIONS = [
  {
    title: 'Mine it yourself',
    description:
      'Juno Cash uses CPU-friendly RandomX mining. Join a pool or mine solo using commodity hardware.',
    href: GET_STARTED_LINK_CONFIG.acquire.mineYourself,
    cta: 'Read the mining guide',
    icon: 'pickaxe',
  },
  {
    title: 'Accept payments',
    description:
      'Accept Juno Cash for goods and services with private-by-default settlement and no custodial intermediaries.',
    href: GET_STARTED_LINK_CONFIG.acquire.acceptPayments,
    cta: 'Set up JunoPayServer',
    icon: 'payments',
  },
]

const LEARN_MORE_RESOURCES = [
  {
    title: 'Technology',
    subtitle: 'How it works',
    href: GET_STARTED_LINK_CONFIG.learnMore.technology,
    icon: 'technology',
  },
  {
    title: 'FAQ',
    subtitle: 'Common questions',
    href: GET_STARTED_LINK_CONFIG.learnMore.faq,
    icon: 'faq',
  },
  {
    title: 'Block Explorer',
    subtitle: 'junocash.dedoo.xyz',
    href: GET_STARTED_LINK_CONFIG.learnMore.blockExplorer,
    icon: 'explorer',
  },
  {
    title: 'Discord',
    subtitle: 'Get help & support',
    href: GET_STARTED_LINK_CONFIG.learnMore.discord,
    icon: 'discord',
  },
]

const ZKP_VALIDITY_POINTS = [
  'You own the coins you are spending',
  'You are not double-spending',
  'Transaction values balance correctly',
]

const ORCHARD_HIGHLIGHTS = [
  {
    title: 'Fast Signing',
    description: 'Creating an Orchard transaction takes 2-5 seconds on commodity hardware.',
  },
  {
    title: 'Fast Verification',
    description: 'Nodes verify transactions in under 100 milliseconds for rapid network synchronization.',
  },
  {
    title: 'Battle-Tested',
    description: 'Orchard has run live on Zcash since 2022 with audits and real-world production use.',
  },
  {
    title: 'Single Pool',
    description: 'One shielded pool means one larger anonymity set with no protocol-era fragmentation.',
  },
]

const TRUST_MODEL_STEPS = [
  {
    label: 'The Problem',
    text:
      'Earlier zero-knowledge systems required trusted setup ceremonies. If toxic waste survived, proofs could be forged.',
  },
  {
    label: "Zcash's Approach",
    text:
      'Zcash used carefully designed multi-party ceremonies with many participants, but this still introduced trust assumptions.',
  },
  {
    label: "Juno Cash's Approach",
    text:
      'Juno Cash relies on Halo 2 via Orchard, removing trusted setup entirely and reducing trust to cryptographic hardness assumptions.',
    accent: true,
  },
]

const RANDOMX_REASONS = [
  {
    title: 'ASIC Resistance',
    text: 'Avoids the hardware centralization profile seen in ASIC-only mining ecosystems.',
  },
  {
    title: 'Accessibility',
    text: 'Anyone with a modern CPU can participate in mining and network security.',
  },
  {
    title: 'Decentralization',
    text: 'Broad participation reduces hashpower concentration among a small operator set.',
  },
]

const SUPPLY_FLOW_POINTS = [
  {
    title: 'Visible Coinbase',
    text: 'Mining rewards are observable at issuance.',
  },
  {
    title: 'Irreversible Shielding',
    text: 'Newly issued coins are shielded before entering circulation.',
  },
  {
    title: 'Private Circulation',
    text: 'User funds remain in shielded circulation rather than transparent pools.',
  },
]

const MONETARY_PARAMETERS = [
  { label: 'Total Supply', value: '21 Million' },
  { label: 'Block Time', value: '60 Seconds' },
  { label: 'Consensus', value: 'PoW (RandomX)' },
  { label: 'Founder Reward', value: 'None (0%)' },
]

const EMISSION_PHASES = [
  {
    title: 'Genesis',
    range: 'Block 0',
    text: 'Zero emission. Clean initialization point for the network.',
    done: true,
  },
  {
    title: 'Slow Start',
    range: 'Blocks 1-20,000',
    text: 'Rewards increase linearly from 0.25 to 12.5 JUNO over ~13.9 days.',
    tag: 'Total: ~127,500 JUNO',
    done: true,
  },
  {
    title: 'Plateau',
    range: 'Blocks 20,001-120,000',
    text: 'Constant 12.5 JUNO per block for ~69.4 days to stabilize early economics.',
    tag: 'Total: 1,250,000 JUNO',
    done: true,
  },
  {
    title: 'Initial Halving',
    range: 'Blocks 120,001-1,171,200',
    text: '6.25 JUNO per block for ~2 years.',
    tag: 'Total: 6,570,000 JUNO',
    current: true,
  },
  {
    title: 'Standard Halvings',
    range: 'Blocks 1,171,201+',
    text: 'Starting at 3.125 JUNO, then halving every ~4 years under a Bitcoin-style curve.',
    tag: 'Final Block: 16,508,927',
  },
]

const TECH_RESOURCES = [
  {
    title: 'Juno Cash Resources',
    accent: true,
    links: [
      { label: 'Juno Cash Whitepaper (PDF)', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.junoWhitepaper },
      { label: 'Juno Cash GitHub', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.junoGithub },
    ],
  },
  {
    title: 'External Resources',
    accent: false,
    links: [
      { label: 'Orchard Protocol Specification', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.orchardSpecification },
      { label: 'Halo 2 Book', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.halo2Book },
      { label: 'Halo: Recursive Proof Composition', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.haloRecursivePaper },
      { label: 'RandomX Algorithm', href: TECHNOLOGY_RESOURCE_LINK_CONFIG.randomX },
    ],
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

function GetStartedIcon({ type }) {
  const iconClass = 'w-6 h-6'

  if (type === 'node') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    )
  }

  if (type === 'wallet') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 15h0M2 9.5h20" />
      </svg>
    )
  }

  if (type === 'mining') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }

  if (type === 'pickaxe') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547" />
        <path d="M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z" />
      </svg>
    )
  }

  if (type === 'payments') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }

  if (type === 'technology') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547" />
        <path d="M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z" />
      </svg>
    )
  }

  if (type === 'faq') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8.228 9C8.777 7.835 10.258 7 12 7c2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093" />
        <path d="M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )
  }

  if (type === 'explorer') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
    )
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function isExternalHref(href) {
  return href.startsWith('http://') || href.startsWith('https://')
}

function resolveNavHref(link) {
  return link.pageHref
}

function isNavLinkActive(link, currentPage) {
  if (currentPage === 'home') {
    return link.pageHref === ROUTES.HOME
  }

  if (currentPage === 'technology') {
    return link.pageHref === ROUTES.TECHNOLOGY
  }

  if (currentPage === 'faq') {
    return link.pageHref === ROUTES.FAQ
  }

  return false
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

function HeaderNav({ theme, onToggleTheme, currentPage }) {
  const logoSrc = LOGO_BY_THEME[theme] ?? LOGO_BY_THEME.dark
  const navLinks = NAV_LINKS.map((link) => ({
    ...link,
    href: resolveNavHref(link),
  }))
  const action = HEADER_NAV_CONFIG.action

  return (
    <nav className="site-nav fixed w-full z-50 top-0 left-0 border-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-7 h-[4.75rem] sm:h-[5.5rem] flex items-center justify-between">
        <a href={HEADER_NAV_CONFIG.brandHref} className="nav-brand group cursor-pointer" aria-label="Juno Cash home">
          <img src={logoSrc} alt="Juno Cash" className="brand-logo brand-logo-nav group-hover:opacity-85 transition-opacity" />
        </a>

        <div className="hidden md:flex items-center gap-8 mono text-xs tracking-widest muted uppercase">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`nav-link transition-all ${isNavLinkActive(link, currentPage) ? 'nav-link-active' : ''}`}>
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
          <a href={action.href} className="md:hidden px-3 py-1.5 border rounded-full mono text-[10px] uppercase action-link">
            {action.label}
          </a>
          <a href={action.href} className="hidden md:block px-6 py-2 border rounded-full mono text-xs uppercase action-link">
            {action.label}
          </a>
        </div>
      </div>

      <div className="md:hidden px-6 sm:px-7 pb-4">
        <div className="mobile-nav-grid">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-chip mono text-[9px] uppercase tracking-[0.16em] text-center ${isNavLinkActive(link, currentPage) ? 'mobile-nav-chip-active' : ''}`}
            >
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
    <header className="relative min-h-[calc(100svh-8.75rem)] md:min-h-screen mt-[8.75rem] md:mt-0 flex flex-col justify-center items-center text-center px-5 sm:px-6 pt-6 md:pt-20 pb-14 md:pb-0 z-10 fade-in">
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

      <div className="flex flex-col md:flex-row gap-3 sm:gap-6 items-center w-full max-w-sm md:w-auto md:max-w-none">
        <a href={HOME_LINK_CONFIG.heroPrimary.href} className="btn-primary w-full md:w-auto text-center px-10 py-4 rounded-sm mono text-sm uppercase tracking-widest font-semibold">
          {HOME_LINK_CONFIG.heroPrimary.label}
        </a>
        <a href={HOME_LINK_CONFIG.heroSecondary.href} className="btn-secondary w-full md:w-auto text-center px-10 py-4 rounded-sm mono text-sm uppercase tracking-widest">
          {HOME_LINK_CONFIG.heroSecondary.label}
        </a>
      </div>

      <div className="mt-9 grid w-full max-w-md grid-cols-2 gap-3 text-center md:hidden">
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
    <section id="features" className="py-20 sm:py-24 lg:py-32 relative z-10 section-gradient">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 sm:p-8 md:p-12 col-span-1 md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 accent-glow rounded-full blur-[80px] group-hover:opacity-70 transition-opacity" />
            <div className="relative z-10 text-center md:text-left">
              <div className="mono text-xs accent-text accent-tag inline-block px-2 py-1 rounded mb-6">Mandatory Privacy</div>
              <h3 className="text-3xl sm:text-4xl serif mb-4 heading-color">Privacy that actually works.</h3>
              <p className="body-muted leading-relaxed max-w-lg">
                Every transaction uses Orchard protocol. No transparent addresses. No unshielding. Unlike optional privacy systems where shielded
                transactions stand out, Juno Cash makes privacy the only option, strengthening protection for all users.
              </p>
            </div>
          </div>

          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className="glass-panel p-6 sm:p-8 relative group text-center md:text-left">
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
    <section id="technology" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
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
    <section id="philosophy" className="py-24 sm:py-32 md:py-40 flex items-center justify-center relative bg-subtle">
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
    <section id="mining" className="py-20 sm:py-24 bg-main">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl serif mb-4 heading-color">Battle-Tested Heritage</h2>
          <p className="text-dim">Built on proven cryptographic systems, with defaults optimized for private peer-to-peer cash.</p>
        </div>

        <div className="xl:hidden space-y-3">
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

        <div className="hidden xl:block">
          <table className="comparison-table w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-soft">
                <th className="w-[28%] py-4 px-4 mono text-xs uppercase text-faint font-normal">Feature</th>
                <th className="w-[24%] py-4 px-4 mono text-xs uppercase accent-text font-normal">Juno Cash</th>
                <th className="w-[24%] py-4 px-4 mono text-xs uppercase text-faint font-normal">Zcash</th>
                <th className="w-[24%] py-4 px-4 mono text-xs uppercase text-faint font-normal">Monero</th>
              </tr>
            </thead>
            <tbody className="mono text-sm">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-subtle-row transition-colors">
                  <td className="py-5 px-4 text-primary-soft align-top">{row.feature}</td>
                  <td className="py-5 px-4 accent-text align-top">{row.juno}</td>
                  <td className="py-5 px-4 text-dim align-top">{row.zcash}</td>
                  <td className="py-5 px-4 text-dim align-top">{row.monero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function FAQPage() {
  return (
    <main id="faq-top" className="relative z-10 pt-40 md:pt-40 pb-16 sm:pb-20">
      <header className="text-center px-5 sm:px-6 mb-14 sm:mb-16 fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6">
          <span className="serif italic gradient-text text-glow">Common Questions</span>
        </h1>
        <p className="text-base sm:text-lg body-muted font-light max-w-3xl mx-auto">
          Clear answers on privacy, cryptography, economics, and mining.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="space-y-10 sm:space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-36">
              <div className="mb-6 sm:mb-8">
                <span className="mono text-xs uppercase tracking-[0.2em] accent-text block">{section.title}</span>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <details key={item.question} className="faq-item group rounded-sm overflow-hidden">
                    <summary className="flex justify-between items-center p-5 sm:p-6 cursor-pointer transition-colors list-none gap-4">
                      <span className="serif text-lg sm:text-xl italic heading-color">{item.question}</span>
                      <span className="faq-arrow text-faint transition-transform">↓</span>
                    </summary>
                    <div className="p-5 sm:p-6 pt-4 sm:pt-3 faq-answer-border">
                      <div className="space-y-4">
                        {item.answer.map((paragraph) => (
                          <p key={paragraph.slice(0, 28)} className="body-muted leading-relaxed text-sm sm:text-base">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function GetStartedPage() {
  return (
    <main className="relative z-10 pt-40 md:pt-40 pb-16 sm:pb-20">
      <header className="text-center px-5 sm:px-6 mb-20 sm:mb-24 fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6">
          <span className="serif italic gradient-text text-glow">Get Started</span>
        </h1>
        <p className="text-base sm:text-lg body-muted font-light max-w-2xl mx-auto">
          Everything you need to start using Juno Cash. Choose your path to private digital money.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-5 sm:px-6 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {START_PATHWAYS.map((pathway) => {
            const external = isExternalHref(pathway.href)

            return (
              <article key={pathway.title} className="glass-panel p-7 sm:p-8 md:p-10 flex flex-col items-start h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 accent-glow rounded-full blur-[40px] group-hover:opacity-70 transition-opacity" />

                <div className="start-icon-shell w-12 h-12 mb-7 sm:mb-8 flex items-center justify-center rounded-full border transition-colors">
                  <span className="accent-text">
                    <GetStartedIcon type={pathway.icon} />
                  </span>
                </div>

                <h3 className="text-2xl serif heading-color mb-3">{pathway.title}</h3>
                <p className="text-sm text-dim leading-relaxed mb-8 flex-grow">{pathway.description}</p>

                <a
                  href={pathway.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`${pathway.primary ? 'btn-primary' : 'btn-secondary'} w-full py-3 rounded-sm mono text-xs uppercase tracking-widest text-center`}
                >
                  {pathway.cta}
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 mb-24 sm:mb-32">
        <div className="mb-12">
          <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Full Node Setup</span>
          <h2 className="text-3xl sm:text-4xl serif heading-color">Running a full node</h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-7 top-4 bottom-4 border-l border-dashed border-subtle z-0" />

          <div className="space-y-10 sm:space-y-12">
            <article className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="setup-step-node">1</div>
              </div>
              <div className="flex-grow pt-1 md:pt-2">
                <h4 className="text-xl font-medium heading-color mb-2">Download the software</h4>
                <p className="text-dim text-sm leading-relaxed mb-4">
                  Get the latest Juno Cash release for Linux, macOS, or Windows. Verify release signatures before running binaries.
                </p>
                <a
                  href={GET_STARTED_LINK_CONFIG.setup.releases.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 accent-text text-sm hover:underline underline-offset-4"
                >
                  <span>{GET_STARTED_LINK_CONFIG.setup.releases.label}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="setup-step-node">2</div>
              </div>
              <div className="flex-grow pt-1 md:pt-2">
                <h4 className="text-xl font-medium heading-color mb-2">Run the node</h4>
                <p className="text-dim text-sm leading-relaxed mb-4">
                  Start the daemon and allow it to synchronize the chain. Initial sync time depends on hardware and network conditions.
                </p>
                <div className="setup-code-block mono text-sm accent-text">./junocashd</div>
              </div>
            </article>

            <article className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="setup-step-node">3</div>
              </div>
              <div className="flex-grow pt-1 md:pt-2">
                <h4 className="text-xl font-medium heading-color mb-2">Get your address</h4>
                <p className="text-dim text-sm leading-relaxed">
                  Press <span className="setup-inline-key mono">E</span> in the running node to reveal your receiving address.
                </p>
              </div>
            </article>

            <article className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="setup-step-node">4</div>
              </div>
              <div className="flex-grow pt-1 md:pt-2">
                <h4 className="text-xl font-medium heading-color mb-4">Get some Juno Cash</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-dim">
                    <span className="setup-bullet mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="heading-color">Mining:</strong> mine directly to your wallet with RandomX.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-dim">
                    <span className="setup-bullet mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="heading-color">Trading:</strong> trade peer-to-peer where Juno markets are available.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-dim">
                    <span className="setup-bullet mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="heading-color">Payments:</strong> accept private Juno transactions for services.
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-6 mb-24 sm:mb-32">
        <div className="mb-10">
          <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Acquire Juno Cash</span>
          <h2 className="text-3xl sm:text-4xl serif heading-color">Ways to get Juno Cash</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACQUIRE_OPTIONS.map((option) => {
            const external = isExternalHref(option.href)

            return (
              <article key={option.title} className="glass-panel p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute inset-0 accent-wash opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="start-icon-shell w-12 h-12 mb-6 flex items-center justify-center rounded-full border">
                    <span className="accent-text">
                      <GetStartedIcon type={option.icon} />
                    </span>
                  </div>
                  <h3 className="text-2xl serif heading-color mb-3">{option.title}</h3>
                  <p className="text-dim text-sm leading-relaxed mb-6">{option.description}</p>
                  <a
                    href={option.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 accent-text text-sm hover:underline underline-offset-4"
                  >
                    <span>{option.cta}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-10">
          <span className="mono text-xs uppercase tracking-[0.2em] text-faint mb-4 block">Resources</span>
          <h2 className="text-3xl serif heading-color">Learn more</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARN_MORE_RESOURCES.map((resource) => {
            const external = isExternalHref(resource.href)
            return (
              <a
                key={resource.title}
                href={resource.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="resource-panel block p-6 rounded-sm group transition-all"
              >
                <div className="mb-4 text-faint">
                  <GetStartedIcon type={resource.icon} />
                </div>
                <h4 className="text-lg font-medium heading-color mb-1">{resource.title}</h4>
                <p className="text-xs text-faint">{resource.subtitle}</p>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function TechnologyPage() {
  return (
    <main className="relative z-10 pt-40 md:pt-40 pb-16 sm:pb-20">
      <header className="text-center px-5 sm:px-6 mb-20 sm:mb-24 fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6">
          <span className="serif italic gradient-text text-glow">Technology</span>
        </h1>
        <p className="text-base sm:text-lg body-muted font-light max-w-2xl mx-auto">
          A deep dive into the cryptography and system design behind Juno Cash.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 space-y-24 sm:space-y-28">
        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Foundation</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">Zero-Knowledge Proofs</h2>
          </div>

          <div className="space-y-6 text-dim font-light leading-relaxed text-base sm:text-lg">
            <p>
              Zero-knowledge proofs (ZKPs) let a prover convince a verifier that a statement is true without revealing any information beyond
              validity.
            </p>
            <p>In cryptocurrency terms, this means you can prove all core transaction rules are satisfied while keeping transaction details hidden.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
            {ZKP_VALIDITY_POINTS.map((point) => (
              <article
                key={point}
                className="glass-panel p-6 rounded-sm border-l-2 border-t-0 border-r-0 border-b-0"
                style={{ borderLeftColor: 'var(--accent)' }}
              >
                <p className="text-primary-soft">{point}</p>
              </article>
            ))}
          </div>

          <div className="space-y-6 text-dim font-light leading-relaxed text-base sm:text-lg">
            <p>...without revealing who sent the transaction, who received it, or how much was transferred.</p>
            <p>
              ZKPs were created for privacy. While many modern crypto projects use them primarily for scaling, Juno Cash uses them for their original
              purpose: private money.
            </p>
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Protocol</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">Orchard</h2>
          </div>

          <div className="max-w-4xl">
            <p className="text-dim text-base sm:text-lg leading-relaxed mb-6">
              Orchard is the shielded transaction protocol powering Juno Cash, built on years of production cryptography and implementation work.
            </p>
            <p className="text-dim text-base sm:text-lg leading-relaxed">
              Juno Cash uses <strong className="heading-color">only Orchard</strong>: no transparent addresses and no legacy shielded-pool
              fragmentation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ORCHARD_HIGHLIGHTS.map((item) => (
              <article key={item.title} className="glass-panel p-6">
                <h4 className="serif text-xl heading-color mb-2">{item.title}</h4>
                <p className="text-sm text-dim leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Proof System</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">Halo 2</h2>
          </div>

          <p className="text-dim text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Halo 2 is the proving system under Orchard and delivers two critical advantages for long-term privacy security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <article className="glass-panel p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 accent-glow rounded-full blur-[40px] group-hover:opacity-70 transition-opacity" />
              <h3 className="text-2xl serif heading-color mb-4 relative z-10">No Trusted Setup</h3>
              <p className="text-dim text-sm leading-relaxed relative z-10">
                Halo 2 removes ceremony-dependent toxic-waste assumptions and avoids setup artifacts that could undermine soundness.
              </p>
            </article>

            <article className="glass-panel p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 accent-glow rounded-full blur-[40px] group-hover:opacity-70 transition-opacity" />
              <h3 className="text-2xl serif heading-color mb-4 relative z-10">Recursive Proofs</h3>
              <p className="text-dim text-sm leading-relaxed relative z-10">
                Recursive composition enables advanced proof structures and future extensibility without compromising privacy guarantees.
              </p>
            </article>
          </div>

          <div className="mt-8 text-center">
            <p className="accent-text serif italic text-xl">No ceremony. No toxic waste. No trust assumptions.</p>
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Security</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">No Trusted Setup</h2>
          </div>

          <div className="border-l border-soft pl-6 space-y-8">
            {TRUST_MODEL_STEPS.map((step) => (
              <article key={step.label}>
                <h4 className={`font-medium mb-2 ${step.accent ? 'accent-text' : 'heading-color'}`}>{step.label}</h4>
                <p className={`${step.accent ? 'text-muted' : 'text-dim'} text-sm leading-relaxed`}>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Consensus</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">RandomX Mining</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div>
              <p className="text-dim leading-relaxed mb-6">
                Juno Cash uses RandomX, a CPU-focused proof-of-work algorithm designed to preserve broad miner participation.
              </p>
              <ul className="space-y-4">
                {RANDOMX_REASONS.map((reason) => (
                  <li key={reason.title} className="flex gap-4">
                    <span className="setup-bullet mt-2 flex-shrink-0" />
                    <div>
                      <strong className="heading-color block text-sm mb-1">{reason.title}</strong>
                      <span className="text-dim text-sm">{reason.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <article className="glass-panel p-8 bg-gradient-to-br from-white/[0.02] to-transparent">
              <h4 className="mono text-xs uppercase tracking-widest text-faint mb-4">Why it matters</h4>
              <p className="text-muted text-sm leading-relaxed mb-4">
                CPU mining trades some raw hashrate specialization for wider participation and reduced dependence on concentrated hardware supply chains.
              </p>
              <p className="heading-color text-sm italic serif">
                Broad mining participation improves resilience against regulatory pressure, manufacturer collusion, and geographic concentration.
              </p>
            </article>
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div>
              <div className="mb-8">
                <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Economics</span>
                <h2 className="text-3xl sm:text-4xl serif heading-color">Supply Mechanism</h2>
              </div>
              <p className="text-dim text-sm leading-relaxed mb-6">
                Juno Cash keeps issuance auditable while maintaining shielded private circulation for user funds.
              </p>
              <div className="space-y-6">
                {SUPPLY_FLOW_POINTS.map((point) => (
                  <article key={point.title} className="border-l border-soft pl-4">
                    <h4 className="heading-color text-sm font-medium">{point.title}</h4>
                    <p className="text-faint text-xs mt-1">{point.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="glass-panel p-8">
              <h4 className="mono text-xs uppercase tracking-widest accent-text mb-6">Monetary Parameters</h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {MONETARY_PARAMETERS.map((param) => (
                  <div key={param.label}>
                    <div className="text-faint text-xs uppercase tracking-wider mb-1">{param.label}</div>
                    <div className="heading-color mono text-base sm:text-lg">{param.value}</div>
                  </div>
                ))}
                <div className="col-span-2 pt-4 border-t border-subtle">
                  <div className="text-faint text-xs uppercase tracking-wider mb-1">Hard Cap Date</div>
                  <div className="heading-color mono text-sm">Block 16,508,927 (~31.4 years)</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="tech-fade-section">
          <div className="mb-8">
            <span className="mono text-xs uppercase tracking-[0.2em] accent-text mb-4 block">Emission</span>
            <h2 className="text-3xl sm:text-4xl serif heading-color">Five-Phase Schedule</h2>
          </div>

          <div className="relative pl-2 sm:pl-4">
            <div className="space-y-10 sm:space-y-12">
              {EMISSION_PHASES.map((phase, index) => (
                <article key={phase.title} className="relative z-10 pl-8 emission-step">
                  {index < EMISSION_PHASES.length - 1 && (
                    <div className={`emission-connector ${phase.done ? 'emission-connector-complete' : 'emission-connector-upcoming'}`} />
                  )}
                  <div
                    className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border bg-main flex items-center justify-center ${
                      phase.done ? 'emission-node-done' : phase.current ? 'emission-node-current' : 'emission-node-upcoming'
                    }`}
                  >
                    {(phase.done || phase.current) && (
                      <span className={`emission-node-core ${phase.done ? 'emission-node-core-done' : 'emission-node-core-current'}`} />
                    )}
                  </div>
                  <h4 className="text-lg font-medium heading-color mb-1">
                    {phase.title}
                    <span className="text-faint font-normal ml-2 mono text-xs">{phase.range}</span>
                  </h4>
                  <p className="text-dim text-sm">{phase.text}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {phase.tag && <span className="inline-block px-2 py-1 metric-card rounded text-xs accent-text mono">{phase.tag}</span>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tech-fade-section pt-10 sm:pt-12 border-t border-subtle">
          <div className="mb-10 text-center">
            <span className="mono text-xs uppercase tracking-[0.2em] text-faint mb-4 block">Further Reading</span>
            <h2 className="text-3xl serif heading-color">Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TECH_RESOURCES.map((column) => (
              <div key={column.title}>
                <h4 className={`mono text-xs uppercase tracking-widest mb-6 border-b border-soft pb-2 ${column.accent ? 'accent-text' : 'text-faint'}`}>
                  {column.title}
                </h4>
                <div className="space-y-4">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-panel block p-4 rounded-sm group flex items-center justify-between"
                    >
                      <span className={`${column.accent ? 'text-primary-soft group-hover:accent-text' : 'text-dim group-hover:text-primary-soft'} transition-colors`}>
                        {link.label}
                      </span>
                      <svg className="w-4 h-4 text-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function FooterSection({ theme }) {
  const logoSrc = LOGO_BY_THEME[theme] ?? LOGO_BY_THEME.dark

  return (
    <footer className="py-14 sm:py-20 border-t border-subtle bg-main relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
        <div className="hidden md:block col-span-1 sm:col-span-2 md:col-span-1">
          <div className="mb-6">
            <img src={logoSrc} alt="Juno Cash" className="brand-logo brand-logo-footer" />
          </div>
          <p className="text-dim text-sm leading-relaxed mb-6">Private digital cash. Every transaction shielded. No compromises.</p>
          <div className="hidden md:block mono text-xs text-faint">
            © 2026 Juno Project.
            <br />
            Open Source (MIT).
          </div>
        </div>

        {FOOTER_LINK_COLUMNS.map((column) => (
          <div key={column.title}>
            <h5 className="mono text-xs uppercase tracking-widest accent-text mb-6">{column.title}</h5>
            <ul className="space-y-4 text-sm text-dim">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>

        <div className="mt-10 pt-8 border-t border-subtle md:hidden">
          <div className="flex flex-col items-center text-center">
            <img src={logoSrc} alt="Juno Cash" className="brand-logo brand-logo-footer-mobile mb-4" />
            <p className="text-dim text-sm leading-relaxed mb-5 max-w-[18rem]">
              Private digital cash. Every transaction shielded. No compromises.
            </p>
            <div className="mono text-xs text-faint">
              © 2026 Juno Project.
              <br />
              Open Source (MIT).
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <FeaturesSection />
      <TechnologySection />
      <PhilosophySection />
      <HeritageSection />
    </main>
  )
}

function getPathname() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path.length > 0 ? path : '/'
}

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, '')
  return path.length > 0 ? path : '/'
}

function scrollToHash(hash, behavior = 'smooth') {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) {
    return false
  }

  const target = document.getElementById(id)
  if (!target) {
    return false
  }

  target.scrollIntoView({ behavior, block: 'start' })
  return true
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => getPathname())
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const currentPage =
    currentPath === ROUTES.GET_STARTED ? 'get-started' : currentPath === ROUTES.FAQ ? 'faq' : currentPath === ROUTES.TECHNOLOGY ? 'technology' : 'home'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    if (currentPage === 'get-started') {
      document.title = 'Get Started | Juno Cash'
      return
    }

    if (currentPage === 'technology') {
      document.title = 'Technology | Juno Cash'
      return
    }

    if (currentPage === 'faq') {
      document.title = 'FAQ | Juno Cash'
      return
    }

    document.title = 'Juno Cash | Private Digital Currency'
  }, [currentPage])

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const navigateInternal = useCallback(
    (nextPath, hash = '') => {
      const normalizedNextPath = normalizePath(nextPath)
      const samePath = normalizedNextPath === currentPath
      const sameHash = hash === window.location.hash

      if (samePath && sameHash) {
        return
      }

      const commitNavigation = () => {
        const nextUrl = `${normalizedNextPath}${hash}`

        if (samePath) {
          window.history.replaceState({}, '', nextUrl)
        } else {
          window.history.pushState({}, '', nextUrl)
          setCurrentPath(normalizedNextPath)
        }

        window.requestAnimationFrame(() => {
          if (hash) {
            const didScroll = scrollToHash(hash, 'smooth')
            if (!didScroll && !samePath) {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            }
            return
          }

          if (!samePath) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
          }
        })
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const supportsViewTransitions = typeof document.startViewTransition === 'function'

      if (!prefersReducedMotion && supportsViewTransitions) {
        document.startViewTransition(commitNavigation)
        return
      }

      setIsPageTransitioning(true)
      commitNavigation()
      window.setTimeout(() => setIsPageTransitioning(false), 150)
    },
    [currentPath],
  )

  const handleInternalNavigation = useCallback(
    (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return
      }

      const rawHref = anchor.getAttribute('href')
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) {
        return
      }
      if (rawHref === '#') {
        event.preventDefault()
        return
      }

      const url = new URL(rawHref, window.location.href)
      if (url.origin !== window.location.origin) {
        return
      }

      const nextPath = normalizePath(url.pathname)
      const samePathHashNavigation = nextPath === currentPath && Boolean(url.hash)
      if (!INTERNAL_ROUTES.has(nextPath) && !samePathHashNavigation) {
        return
      }

      event.preventDefault()
      navigateInternal(nextPath, url.hash)
    },
    [currentPath, navigateInternal],
  )

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(getPathname())
      window.requestAnimationFrame(() => {
        if (window.location.hash) {
          scrollToHash(window.location.hash, 'auto')
        }
      })
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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
    <div className="site-shell antialiased selection:bg-yellow-100 selection:text-black" onClickCapture={handleInternalNavigation}>
      <SparkleField parallax={parallax} />
      <HeaderNav theme={theme} onToggleTheme={() => setTheme(themeLabel)} currentPage={currentPage} />
      <div className={`page-frame ${isPageTransitioning ? 'is-transitioning' : ''}`}>
        {currentPage === 'get-started' ? <GetStartedPage /> : currentPage === 'technology' ? <TechnologyPage /> : currentPage === 'faq' ? <FAQPage /> : <HomePage />}
        <FooterSection theme={theme} />
      </div>
    </div>
  )
}

export default App
