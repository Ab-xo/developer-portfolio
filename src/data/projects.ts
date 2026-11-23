// Public portfolio projects. Descriptions and outcomes are grounded in the CV
// and the linked repositories; no client or production claims are implied.

export type Project = {
  id: string
  index: string
  title: string
  category: string
  year: string
  role: string
  description: string
  tech: string[]
  outcome: string
  href: string
  demoHref?: string
  featured?: boolean
  hue: number
  caseStudy?: {
    problem: string
    approach: string
    delivers: string
  }
}

export const projects: Project[] = [
  {
    id: 'addis-ride',
    index: '01',
    title: 'Addis Ride Forecast',
    category: 'AI/ML · Urban mobility',
    year: '2026',
    role: 'Team lead · AI/ML engineer',
    description:
      'AI/ML forecasting of ride demand across Addis Ababa — an interactive tool showing where and when demand may rise.',
    tech: ['Python', 'LightGBM', 'FastAPI', 'Next.js'],
    outcome: 'Qiyas Hackathon Top 3 runner-up. Led the team.',
    href: 'https://github.com/Ab-xo/addis_ride_forecast',
    demoHref: 'https://addis-ride-forecast.vercel.app/',
    featured: true,
    hue: 42,
    caseStudy: {
      problem: 'Ride-hailing platforms in Addis Ababa lack demand visibility, leaving drivers and dispatchers guessing where to position.',
      approach:
        'Built a LightGBM model trained on hourly features (time, weather, city events) to forecast demand across 12 zones, served via FastAPI and visualised in a Next.js dashboard.',
      delivers: 'Hourly demand forecasts per zone with 8.09 RMSE — 19% better than a seasonal baseline — and an interactive map dashboard.',
    },
  },
  {
    id: 'coffee-guard',
    index: '02',
    title: 'CoffeeGuard AI',
    category: 'Applied ML · Computer vision',
    year: '2026',
    role: 'AI / ML engineer · team project',
    description:
      'Ethiopian coffee-leaf disease detection with confidence scores, explanations, and an "I can\'t tell" option when unsure.',
    tech: ['Python', 'PyTorch', 'EfficientNetV2', 'FastAPI', 'Streamlit'],
    outcome: 'Held-out macro-F1 0.974; external BRACOL accuracy 0.63 — honest about field performance.',
    href: 'https://github.com/Ab-xo/coffee-guard-ai',
    hue: 158,
    caseStudy: {
      problem: 'Coffee leaf diseases threaten Ethiopia\'s largest export crop, but smallholder farmers lack expert diagnosis.',
      approach:
        'Fine-tuned EfficientNetV2 on coffee-leaf disease images with confidence calibration, Grad-CAM explanations, and a deliberate uncertain-answer path for low-confidence predictions.',
      delivers: 'Macro-F1 0.974 on held-out data with visual explanations and an honest "I can\'t tell" fallback for uncertain cases.',
    },
  },
  {
    id: 'retail-pulse',
    index: '03',
    title: 'RetailPulse AI',
    category: 'AI · Decision support',
    year: '2026',
    role: 'Full-stack + AI developer',
    description:
      'Retail decision-support combining sales, inventory and supplier context to forecast demand and flag risks, with AI agents that explain causes and run what-if scenarios.',
    tech: ['Python', 'scikit-learn', 'LLM Agents', 'React', 'FastAPI'],
    outcome: 'AI agents explain causes and run what-if scenarios.',
    href: 'https://github.com/Ab-xo/retail-pulse-ai',
    hue: 192,
    caseStudy: {
      problem: 'Retailers juggle sales, inventory, and supplier data in silos, making it hard to anticipate demand or spot supply risks early.',
      approach:
        'Built a decision-support system that combines sales, inventory, and supplier context to forecast demand, flag risks, and deploy AI agents that explain causes and run what-if scenarios.',
      delivers: 'Unified retail intelligence with explainable demand forecasts, risk alerts, and interactive scenario planning.',
    },
  },
  {
    id: 'siramap',
    index: '04',
    title: 'Siramap',
    category: 'AI application · Career tools',
    year: '2026',
    role: 'Full-stack project developer',
    description:
      'AI-assisted resume analysis that extracts candidate info, evaluates job alignment, and generates career insights.',
    tech: ['React', 'JavaScript', 'AI / LLM integration'],
    outcome: 'A practical job-seeker workflow, with role-specific resume feedback.',
    href: 'https://github.com/Ab-xo/ai-resume-analyzer',
    hue: 24,
    caseStudy: {
      problem: 'Job seekers struggle to understand how clearly their resume communicates fit for a specific role.',
      approach:
        'Built an AI-powered resume analyzer that extracts candidate information, evaluates alignment against a job description, and generates actionable career insights.',
      delivers: 'Role-specific resume feedback with evidence extraction and a clear next-action recommendation.',
    },
  },
  {
    id: 'admas-blog',
    index: '05',
    title: 'Collaborative Blog Platform',
    category: 'Full-stack · Collaboration',
    year: '2026',
    role: 'Student project developer',
    description:
      'A collaborative publishing platform for the university community with AI-assisted writing.',
    tech: ['React', 'Node.js', 'MongoDB', 'AI-assisted writing'],
    outcome: 'Final-year project at Admas University.',
    href: 'https://github.com/Ab-xo/Fullstack-Collaborative-Blogging-Platform-for-Admas-Univeristy',
    hue: 340,
  },
  {
    id: 'ak-drop',
    index: '06',
    title: 'AK E-commerce',
    category: 'Full-stack · Commerce',
    year: '2026',
    role: 'Full-stack developer',
    description:
      'A multi-category storefront with product discovery, persistent cart, accounts, order history, and an admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe test mode'],
    outcome: 'Checkout uses test payments; shipping and fulfillment are not connected.',
    href: 'https://github.com/Ab-xo/Ak-drop-Commerce-Platform',
    demoHref: 'https://ak-drop-commerce-platform.vercel.app/',
    hue: 166,
    caseStudy: {
      problem: 'Local merchants need an accessible, multi-category online storefront without the overhead of enterprise platforms.',
      approach:
        'Built a full-stack e-commerce platform with Next.js, Supabase auth, PostgreSQL, persistent cart, order history, admin dashboard, and Stripe test-mode checkout.',
      delivers: 'A complete storefront experience with product discovery, accounts, and an admin dashboard — deploy-ready for production payments.',
    },
  },
]

export const featuredProject = projects.find((p) => p.featured) as Project
