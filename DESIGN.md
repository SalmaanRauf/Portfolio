# Portfolio Design Direction

## Locked Direction

Use the Swiss industrial print direction approved on May 26, 2026. The page should feel like a working engineering index: hard grid, matte paper, carbon ink, vermilion accent, grayscale imagery, ledger-like experience rows, and sparse utilitarian controls.

Reference comps are stored outside the repo at:

- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/01-hero.png`
- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/02-about.png`
- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/03-capabilities.png`
- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/04-experience.png`
- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/05-projects.png`
- `/Users/salmaanrauf/Library/Mobile Documents/com~apple~CloudDocs/Documents/Headstarter/Portfolio Website/review-screenshots/swiss-sections/06-contact.png`

## Tokens

- Paper: `#f1eee6`, `#fbf8ef`, `#e5e1d7`
- Ink: `#11100d`, `#3a3831`
- Lines: `#191713`, `rgba(25, 23, 19, 0.18)`
- Accent: `#df1d14`
- Display font: Archivo
- Metadata font: IBM Plex Mono

## Component Rules

- Use visible 1px compartment lines and CSS grid for structure.
- Keep corners square. Do not introduce pill cards, glass panels, neon glow, soft blue/purple gradients, or card-inside-card stacking.
- Color is scarce. Vermilion is the only accent and should mark section IDs, active states, and primary signal.
- Images should be real or generated project-specific artifacts, desaturated, high contrast, and framed with crop-mark treatment.
- Experience should read as a ledger/table, not a decorative timeline.
- Project cards should use the Swiss reference crops in `images/project-*-swiss.jpg` unless a stronger product screenshot replaces them.
- Project cards should present product artifacts and concrete jobs, not generic feature blurbs.
- Do not add GitHub CTAs or repository links inside the project cards. Keep projects focused on the case-study/artifact surface.
- Do not add dead CTAs. If a project card is not clickable, use factual metadata like year/domain instead of "available" labels.

## Responsive Rules

- Mobile-first: single column base, then 2-column at 40rem and full grid at 64rem.
- Touch targets must remain at least 44px tall.
- No page-level horizontal scroll.
- Do not scale type directly with viewport width. Use breakpoint-specific font sizes.
- Check at desktop, tablet, mobile, and one awkward breakpoint before calling frontend work complete.

## Copy Rules

- Current positioning: Software / AI Engineer at Robert Half / Protiviti.
- Education positioning: completed B.S. Computer Science at Cal State Fullerton.
- Avoid "student", "class of '26", and generic AI marketing lines like "engineering the future".
- Write concrete systems language: retrieval, RAG, validation, connectors, internal tools, evaluation, traceable output.
