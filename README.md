# 🇮🇳 Bharat Buildathon 2026 — Official Event Website

The official website for **Bharat Buildathon 2026**, an innovation-focused Ideathon that challenges participants to develop creative and practical solutions for real-world problems aligned with India's growth and development. Built with **Next.js 15**, **React 19**, and **GSAP** — featuring award-winning level animations and interactivity.

> **Ideate. Build. Pitch. Win.**

---

## 🚀 What is Bharat Buildathon?

Bharat Buildathon is a high-energy ideathon where teams compete across **two exciting rounds**:

1. **Round 1 — Device-Free Ideation**: No laptops, no phones, no smartwatches. Teams brainstorm and build their solutions on a physical Idea Canvas provided by the organizers. Pure ideas, no distractions.

2. **Round 2 — Pitch & Present**: Shortlisted teams prepare a presentation and pitch their solution before a panel of expert judges.

### 🎯 Ideathon Tracks

Teams can choose from **5 impactful tracks**:

| Track | Focus Area |
|---|---|
| 🏢 **Smart Cities** | Urban infrastructure, transportation, and public services |
| 🩺 **Healthcare** | Accessible medical care, health tracking, biotechnology |
| 📚 **EdTech** | Digital learning tools, accessibility, new methodologies |
| 🌾 **AgriTech** | Smart agriculture, supply chain, sustainability |
| ⚡ **Clean Energy** | Eco-friendly alternatives, waste management, renewables |

### 🏆 Judging Criteria

Teams are evaluated on **5 key dimensions**:

- **Innovation** — Originality, creativity, novelty, out-of-the-box thinking
- **Feasibility** — Technical viability, implementation plan, resource requirements
- **Impact** — Social relevance, scalability, potential for positive change
- **Scalability** — Growth potential, market readiness, business model viability
- **Presentation** — Clarity of thought, storytelling, pitch delivery, Q&A handling

---

## 📅 Event Schedule

| Time | Event | Description |
|---|---|---|
| 9:30 AM – 10:15 AM | Registration | Arrival, team check-in, and networking |
| 10:15 AM – 10:30 AM | Opening Ceremony | Welcome address & event kickoff |
| 10:30 AM – 11:00 AM | Briefing | Rulebook, evaluation criteria & guidelines |
| 11:00 AM – 11:45 AM | Round 1: Ideation | Device-free ideation & solution development |
| 11:45 AM – 1:00 PM | Round 1 Evaluation | Q&A with judges |
| 1:00 PM – 1:40 PM | Lunch Break | Recharge and refuel |
| 1:40 PM – 1:55 PM | Announcement | Qualified teams & instructions for Round 2 |
| 1:55 PM – 2:30 PM | Round 2 Preparation | PPT preparation & final pitch readiness |
| 2:30 PM – 3:45 PM | Final Presentations | Round 2 pitches & jury evaluation |
| 3:45 PM – 4:05 PM | Jury Evaluation | Final deliberation & audience interaction |
| 4:05 PM – 4:30 PM | Closing Ceremony | Results, prize distribution, group photo |

---

## ✨ Website Features

### 🎭 Animations & Interactions

- **GSAP InertiaPlugin Fling** — About section cards and floating labels track mouse velocity; on `mouseleave` they fling with physics-based inertia and snap back.
- **Page Transition Scribble** — Full-screen GSAP-powered scribble mask with random color selection, logo wiggle, and auto-scroll to top.
- **Elastic Judging Cards** — Criteria cards spread apart horizontally on hover with elastic bounce physics; hovered card scales up.
- **Scroll-Triggered SVG Draws** — Hand-drawn underlines and paths animate in via `stroke-dasharray` as the user scrolls.
- **Footer Sticker Proximity Push** — Stickers react to fast cursor swipes with strength proportional to speed, then spring back elastically.
- **Custom Cursor Bubble** — GSAP-tracked blob that follows the cursor with context-aware text on interactive elements.
- **Double Marquee** — Infinite scrolling sponsor/partner logos with smart randomization (no adjacent duplicates).
- **Horizontal Words Scroll** — Scroll-driven horizontal text reveal with decorative SVG stickers.
- **Lenis Smooth Scroll** — Buttery-smooth page scrolling synced with GSAP's ticker.
- **Round Timeline Animation** — Animated timeline connector and staggered card reveals for the competition rounds.
- **Theme Cards Pop-in** — Scale + bounce entrance animations for ideathon track cards on scroll.
- **Tab Title Change** — Title becomes `"Hey, over here! 👋"` when the tab loses focus.

### 🏗️ Website Sections

| Section | Component | Description |
|---|---|---|
| Hero | `Hero.jsx` | Full-screen hero with "Bharat Buildathon 2026" title, tagline, and CTA buttons |
| Horizontal Words | `HorizontalWords.jsx` | Scroll-driven text with decorative SVG stickers |
| About | `About.jsx` | "What is Bharat Buildathon?" with motion cards and floating labels |
| Ideathon Tracks | `Theme.jsx` | 5 themed tracks with animated card grid |
| How It Works | `Rounds.jsx` | Two-round competition flow with animated timeline |
| Schedule | `Schedule.jsx` | Full day-of event schedule |
| Judging Criteria | `JudgingCriteria.jsx` | 5 evaluation criteria cards with elastic interactions |
| FAQ | `FAQ.jsx` | Frequently asked questions accordion |
| Sponsors | `DoubleMarquee.jsx` | Infinite scrolling sponsor/partner logos |
| Footer | `Footer.jsx` | Contact info, socials, sticker interactions |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **React 19** | Component-based UI architecture |
| **Vanilla CSS** | Full design system via CSS Variables — zero Tailwind |
| **GSAP + ScrollTrigger + InertiaPlugin** | All animations, scroll-driven effects, physics-based interactions |
| **Lenis** | Ultra-smooth inertia scrolling |

---

## 📦 Project Structure

```text
Bharat-Buildathon/
├── app/
│   ├── styles/                  # Modular CSS partials
│   │   ├── base.css             # Fonts, CSS variables, reset
│   │   ├── navbar.css           # Navbar & header
│   │   ├── hero.css             # Content section title + underline
│   │   ├── vimeo-hero.css       # Full-screen hero layout
│   │   ├── motion-cards.css     # About section cards + labels
│   │   ├── showreel.css         # Showreel placeholder
│   │   ├── cards.css            # Judging criteria cards
│   │   ├── marquee.css          # Sponsor marquee + animations
│   │   ├── footer.css           # Footer layout + stickers
│   │   ├── cursor.css           # Custom cursor + scribble overlay
│   │   ├── theme.css            # Ideathon tracks grid
│   │   ├── rounds.css           # Competition rounds timeline
│   │   ├── schedule.css         # Event schedule layout
│   │   ├── faq.css              # FAQ accordion
│   │   ├── horizontal-words.css # Horizontal scroll text
│   │   └── responsive.css       # All media queries
│   ├── globals.css              # Entry point — imports all partials
│   ├── layout.jsx               # Root layout with metadata
│   └── page.jsx                 # Main page — assembles all components
│
├── components/
│   ├── About.jsx                # "What is Bharat Buildathon?" section
│   ├── CursorBubble.jsx         # Custom cursor with GSAP tracking
│   ├── DoubleMarquee.jsx        # Sponsor/partner logo marquee
│   ├── FAQ.jsx                  # Frequently asked questions
│   ├── Footer.jsx               # Footer with socials & stickers
│   ├── Hero.jsx                 # Full-screen hero with CTAs
│   ├── HorizontalWords.jsx      # Horizontal scroll text section
│   ├── JudgingCriteria.jsx      # 5 judging criteria cards
│   ├── Navbar.jsx               # Fixed navbar with scroll effects
│   ├── Rounds.jsx               # Two-round competition timeline
│   ├── Schedule.jsx             # Event day schedule
│   ├── SmoothScroll.jsx         # Lenis init + GSAP sync
│   ├── SvgSymbols.jsx           # Hidden SVG symbol definitions
│   ├── Theme.jsx                # Ideathon track cards
│   └── TransitionScribble.jsx   # Page transition animation
│
├── lib/
│   └── data.js                  # All static data (sponsors, judging criteria, schedule, etc.)
│
├── public/
│   ├── assets/                  # SVGs, logos, stickers, decorative elements
│   └── fonts/                   # Self-hosted DM Sans & Epilogue fonts
│
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** 18+ installed

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akshat-sinha-75/Bharat-Buildathon-.git
   cd Bharat-Buildathon-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   ```
   http://localhost:3000
   ```

---

## 👨‍💻 Built By

Made with ❤️ by **Akshat Sinha** — powered by passion for innovation and building for Bharat.

## 📄 License

This project is for the **Bharat Buildathon 2026** event. All rights reserved.
