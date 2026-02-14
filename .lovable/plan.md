

# Phase 1: Homepage + Signature NLP Flow Animation

## Overview
Build Nirmil's dark-mode-first portfolio homepage with the signature Live NLP Flow animation — the single most memorable interactive element on the entire site. Uses Fontshare fonts (Satoshi, General Sans), JetBrains Mono, Framer Motion animations, and a dark/light theme toggle.

---

## 1. Design System & Theme Setup
- Configure CSS variables for the full dark/light color system (near-black bg, cyan/green/orange/purple accents)
- Load Satoshi + General Sans from Fontshare CDN, JetBrains Mono from Google Fonts
- Set up dark mode as default with a smooth-transitioning light mode toggle (localStorage persistence)
- Define spacing rules: 1120px max-width, 120px section padding, 16px card radius, glow-based elevation

## 2. Global Navigation
- Sticky navbar with frosted glass effect (backdrop-blur + semi-transparent bg)
- Left: "Nirmil" logo with cyan accent dot
- Right: Nav links (Home, Blog, AI PM Skills, LLM Fundamentals, Cloud Revolution, Contact) + dark/light toggle
- Mobile: Full-screen hamburger overlay with large links and social icons
- Active link indicator with animated cyan underline
- Navbar becomes more opaque on scroll

## 3. Hero Section
- Full viewport height with subtle animated grid pattern background
- Pre-heading label: "PRODUCT MANAGER · AWS · AI ENTHUSIAST"
- Main heading: "Hi, I'm Nirmil" with cyan text-shadow glow on the name
- Subheading with personal touch (Chipotle & Taco Bell mention)
- Two CTA buttons: "Read My Blog" (filled cyan) + "Explore AI Skills" (outlined)
- Social icon row: GitHub (github.com/imnirmilshah), LinkedIn (linkedin.com/in/nirmil), Medium (imnirmilshah.medium.com)

## 4. Social & Platform Bar
- Three horizontal branded tiles: GitHub, LinkedIn, Medium
- Each with icon, label, subtitle, and colored left-border accent
- Hover effects: background lighten, border thicken, subtle glow
- All open respective profiles in new tabs

## 5. About Section
- Two-column layout (60/40): bio text left, photo placeholder right
- Section label in uppercase cyan, heading "Product thinker. AI demystifier. Builder."
- Warm first-person bio mentioning AWS, AI passion, personal touches
- Animated stat counters that count up on scroll: 15+ Years, 10+ Products, 50+ Teams Led

## 6. Skills & Expertise
- Three cards: Product Management, Technical, AI/ML
- Each with icon header and pill-shaped skill chips
- Chip hover: accent color background at 15% opacity with matching text color

## 7. Experience Timeline
- Vertical timeline with left-aligned line and dot markers
- 4+ career entries with company, role, dates, impact bullets
- AWS entry visually emphasized: larger card, orange left border, "CURRENT" badge, glowing background

## 8. Featured Projects
- 2-column card grid with 4-6 sample project cards
- Each: thumbnail placeholder, title, description, tag pills, icon links
- Click opens modal with full case study details (problem, approach, impact, tech stack)

## 9. Footer
- Dark footer with copyright ("Built with curiosity"), social icons, "Download Resume" button

## 10. ⭐ THE LIVE NLP FLOW — Signature Interactive Element
This is the crown jewel of the entire site — a 7-stage animated walkthrough showing how AI processes text:

- **Stage 1 — Raw Text Input**: Typewriter effect typing out Nirmil's personal sentence, editable by user
- **Stage 2 — Tokenization**: Text visually splits into color-coded token pills with spring physics, showing subword tokenization (Nirmil → "Nir" + "mil")
- **Stage 3 — Embeddings**: Tokens morph/flip into vector representation cards with floating-point numbers
- **Stage 4 — Attention**: Animated lines draw between related tokens showing attention weights (name↔Nirmil, restaurants↔Chipotle, AI↔demystifying) with pulsing glow
- **Stage 5 — Vector Database**: Vectors animate into a constellation scatter plot with semantic clusters (identity, food, AI, preferences) connected by dotted lines
- **Stage 6 — Retrieval**: A query "What does Nirmil do?" triggers vector search with animated radius circle highlighting nearest neighbors
- **Stage 7 — Generated Response**: Terminal-style typing generates a natural language answer from retrieved context

Each stage has: numbered label, clear title, explanatory text below, and smooth transitions between stages. Timeline progress bar at top. "Replay Animation" button. Auto-plays on scroll-into-view. Simplified to 2D stacked layout on mobile. Respects prefers-reduced-motion.

## 11. Route Setup & SEO
- React Router with routes for all pages (Home active, others as placeholder pages)
- React Helmet with title, description, Open Graph tags, JSON-LD Person schema on homepage
- Skip-to-content link, semantic HTML, keyboard focus indicators

## 12. Performance & Accessibility
- Framer Motion scroll-triggered animations with staggered reveals
- prefers-reduced-motion: opacity-only fades, no transforms
- Lazy loaded images with alt text, skeleton shimmer loading states
- WCAG 2.1 AA color contrast, aria-labels on icon buttons

---

## What Comes Next (Future Phases)
- **Phase 2**: Blog page with hardcoded sample posts (Contentful integration later)
- **Phase 3**: AI PM Skills Hub with StepGuide and interactive workflows
- **Phase 4**: LLM Fundamentals with Transformer diagram and AI Agent visuals
- **Phase 5**: Cloud Revolution with three provider architecture diagrams
- **Phase 6**: Contact page with form + Contentful CMS wiring

