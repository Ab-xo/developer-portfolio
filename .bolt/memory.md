# Project memory

## Product intent & audience

- Personal portfolio site for an AI/engineering professional
- Sections: hero with portrait, featured case study, projects, AI pillars, about/stats
- Audience likely recruiters, collaborators, clients evaluating technical depth

## Brand personality & voice

- Premium, cinematic, tactile
- Communicates technical rigor through visual polish rather than dense copy

## Visual design & UX direction

- Accent palette: teal + coral
- Hero: portrait photo as focal point, 3D animated backdrop behind it (noise-distorted wireframe sphere + particle field, mouse-reactive, scroll-away)
- Portrait entrance: scale + fade as part of hero timeline
- Scroll reveals: blur-to-focus (cinematic), not just slide-up
- Count-up animations for metric numbers (e.g. 8.09 RMSE)
- Divider lines draw in left-to-right on scroll
- Card hover: 3D tilt toward cursor with spring-back (replaces flat lift)
- Individual reveals for project cards, AI pillar cards, About stats
- 3D backdrop should be subtle (reduced opacity, particle size, distortion) — enhance, not compete with portrait

## Decisions, constraints & rationale

- Vite + React stack
- Build verification expected after changes (assistant should run build)
- User image removal is a regression — portrait must be preserved as hero focal point
- 3D scene positioned absolute inset-0 behind relative portrait container
- Prior "improvements" weren't perceived as improvements by user — changes must be visibly impactful and non-destructive

## Open questions & assumptions

- Assumed Three.js or similar for 3D scene (not yet confirmed by inspecting deps)
- Exact portrait asset path unknown
- Dev server assumed running locally
- User's full content/copy not yet seen — sections inferred from component names