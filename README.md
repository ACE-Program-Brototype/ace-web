# ACE Community Portal (`ace-web`)

A modern, high-performance web platform built for **ACE (Advanced Computing Engineers)**. The portal showcases candidate rosters, alumni career trajectories, placement statistics, technical event schedules, engineering publications, and internal administrative tools.

---

## ✨ Features

- **🌐 Dynamic Landing Page (`/`)**: High-impact editorial hero section, live community stats counter, candidate spotlight carousel, and featured engineering journals.
- **🎓 Alumni Network (`/alumni`)**: Directory of ACE alumni working at global tech companies, complete with career trajectories, compensation packages, and success stories.
- **📊 Placement Outcomes (`/outcomes`, `/placements`)**: Comprehensive placement analytics, salary distributions, domain breakdowns, and partner company highlights.
- **👨‍💻 Candidate Roster (`/directory`)**: Interactive candidate directory with filterable tech stacks (Go, React, Python, Rust, PostgreSQL, etc.), batch filters, and profile cards with optimized image assets.
- **📚 Engineering Journal (`/journal`)**: Technical articles, system design deep-dives, and engineering essays authored by candidates and mentors.
- **📅 Technical Events (`/events`)**: Schedule of hackathons, masterclasses, tech summits, and panel discussions with filterable event categories.
- **🛡️ Team & Handlers (`/handlers`)**: Profiles of program directors, technical mentors, and placement handlers.
- **💬 Contact & FAQs (`/contact`)**: Interactive inquiry form, candidate eligibility criteria, and expandable FAQ accordion.
- **🔒 Admin Dashboard (`/admin`)**: Internal management portal for candidate reviews, program metrics, cohort scheduling, and audit logs.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) with `AnimatePresence` animated route transitions
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (custom editorial dark design system, typography, glassmorphism, responsive grid layouts)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (scroll progress indicator, staggered reveals, smooth page transitions, dynamic counters)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Asset Pipeline**: WebP image compression engine for candidate portraits (`assets/candidates/`)
- **Linter**: [Oxlint](https://github.com/oxc-project/oxc) for high-speed JS/JSX linting

---

## 📁 Project Structure

```
ace-web/
├── assets/
│   └── candidates/          # Optimized WebP candidate photos & profile assets
├── public/                  # Static public assets (favicons, SVG icon sets)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AnimatedText.jsx # Dynamic typing & text animation
│   │   ├── Footer.jsx       # Global page footer
│   │   ├── Navbar.jsx       # Floating navigation bar with active route highlighting
│   │   ├── PageTransition.jsx
│   │   ├── ProfileCard.jsx  # Candidate & alumni profile card layout
│   │   ├── ScrollProgress.jsx # Top scroll indicator bar
│   │   ├── SectionReveal.jsx  # Scroll-triggered section animation wrapper
│   │   └── StatCounter.jsx    # Animated number ticker
│   ├── constants/           # Mock databases & data structures
│   │   ├── eventDatas.js    # Technical events data
│   │   ├── navLinks.js      # Navigation menu structure
│   │   └── teamDatas.js     # Team & mentor profiles
│   ├── pages/               # Application view routes
│   │   ├── AdminDashboard.jsx
│   │   ├── AlumniPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── JournalPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── PlacementPage.jsx
│   │   ├── StudentsPage.jsx
│   │   └── TeamPage.jsx
│   ├── App.jsx              # Main App entry with router setup & layout logic
│   ├── main.jsx             # React DOM root render
│   └── index.css            # Tailwind directives & core design system tokens
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ACE-Program-Brototype/ace-web.git
   cd ace-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## ⚙️ Available Scripts

- `npm run dev`: Launch Vite local development server with HMR.
- `npm run build`: Build production assets into the `dist/` directory.
- `npm run preview`: Serve the local production build for testing.
- `npm run lint`: Execute Oxlint static code analysis across source files.

---

## 🖼️ Image Delivery & Optimization

Candidate images located in `assets/candidates/` are converted and compressed using **WebP** with EXIF orientation preservation, delivering **>90% file size reduction** for instant loading on mobile and web clients.

---

## 📄 License

Private & Proprietary — ACE Community Platform.

