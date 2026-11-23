// Portfolio content, grounded in Abraham's CV and public project work.

export const site = {
  fullName: 'Abraham Gebeyehu',
  firstName: 'Abraham',
  title: 'Full-Stack Software Engineer | AI/ML Engineer',
  role: 'Full-Stack Software Engineer · AI / ML Engineer',
  tagline: 'AI • Software • Data • Digital Solutions',
  location: 'Addis Ababa, Ethiopia',
  timezone: 'EAT',
  email: 'gebeyehuabraham19@gmail.com',
  phone: '+251984876850',
  availability: 'Open to full-time roles and freelance projects',
  oneLiner:
    'I build practical web products, data applications and AI-powered experiences, with a focus on solving real problems in Ethiopia.',
  heroLines: ['Full-stack', 'products.', 'Practical AI.'],
  heroStatement:
    'I build useful web products end to end, and bring data and AI into the parts of a product where they make a real difference.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Ab-xo' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/abraham-gebeyehu-builds' },
    { label: 'Hugging Face', href: 'https://huggingface.co/Ab-xodev' },
    { label: 'Email', href: 'mailto:gebeyehuabraham19@gmail.com' },
  ],
} as const

export const nav = [
  { label: 'Work', target: '#work' },
  { label: 'Skills', target: '#skills' },
  { label: 'Journey', target: '#journey' },
  { label: 'About', target: '#about' },
  { label: 'Contact', target: '#contact' },
] as const

export const introStatement = {
  eyebrow: 'Introduction',
  lines: ['I work from the data layer', 'through the API and interface,', 'to a product people can use.'],
  body: 'Since 2022, I have built full-stack applications as a freelance developer and student project developer. My recent work spans React and Next.js products, Python data workflows, demand forecasting, computer vision, and AI-assisted resume analysis.',
}

export const about = {
  eyebrow: 'About',
  title: 'Abraham',
  pinnedParagraph:
    'I am a computer scientist, full-stack software engineer, and AI / ML engineer based in Addis Ababa, Ethiopia. I graduated with a BSc in Computer Science from Admas University in March 2026, with a CGPA of 3.87. I am currently advancing through the Qiyas Intelligent Data & AI Engineering program at Addis Ababa University. My work combines TypeScript, React, Next.js, Node.js, Python, and databases — carrying projects from data preparation and API design to responsive, usable interfaces. I led the team that placed Top 3 at the Qiyas Hackathon with our Addis Ride demand forecasting project.',
  paragraphs: [
    'I am a computer scientist, full-stack software engineer, and AI / ML engineer based in Addis Ababa, Ethiopia. I graduated with a BSc in Computer Science from Admas University in March 2026.',
    'My work combines TypeScript, React, Next.js, Node.js, Python, and databases. I enjoy carrying a project from data preparation and API design to a responsive, usable interface.',
    'I am currently taking the Advanced Digital Skills program in Intelligent Data & AI Engineering at Addis Ababa University through Qiyas.',
  ],
  stats: [
    { k: 'CGPA', v: '3.87', suffix: '/4.00', label: 'BSc Computer Science' },
    { k: 'Program', v: 'Qiyas', suffix: '', label: 'AI & Intelligent Systems' },
    { k: 'Hackathon', v: 'Top 3', suffix: '', label: 'Qiyas Hackathon' },
  ],
  education: [
    { qualification: 'BSc in Computer Science', institution: 'Admas University · Addis Ababa', detail: 'Graduated March 2026 · CGPA 3.87 / 4.00' },
    { qualification: 'Intelligent Data & AI Engineering', institution: 'Qiyas Advanced Digital Skills · Addis Ababa University', detail: 'May 2026 – Present' },
  ],
  tools: ['Claude Code', 'Cursor', 'ChatGPT', 'Gemini', 'Postman', 'OpenAPI / Swagger', 'Docker', 'Git & GitHub', 'Linux', 'Bash', 'CI/CD'],
  languages: ['Amharic', 'English'],
  interests: ['Video games', 'AI research', 'Travel', 'Hackathons', 'Open source'],
}

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something",
  body: 'I am interested in full-time software engineering opportunities and freelance work across full-stack development, AI applications, and data products.',
  cta: 'Discuss a project',
}

export const skills = {
  eyebrow: 'Skills',
  title: 'Tools I work with',
  groups: [
    { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST', 'MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'] },
    { label: 'AI / ML', items: ['PyTorch', 'scikit-learn', 'pandas', 'NumPy', 'Computer Vision', 'RAG', 'LLM Integration'] },
    { label: 'Data', items: ['Python', 'Statsmodels', 'LightGBM', 'Streamlit', 'ETL', 'Web Scraping'] },
    { label: 'DevOps & Tools', items: ['Docker', 'Git & GitHub', 'Linux', 'Bash', 'CI/CD', 'Vercel'] },
  ],
}
