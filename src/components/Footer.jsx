import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants/navLinks';

const FOOTER_COLS = [
  {
    heading: 'Navigation',
    links: [
      { to: '/', label: 'Home' },
      ...NAV_LINKS.map(l => ({
        to: l.to,
        label: l.label.charAt(0) + l.label.slice(1).toLowerCase(),
      })),
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white w-full border-t border-white/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

        {/* Main Footer Content: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16">

          {/* Column 1: Brand + Tagline */}
          <div className="flex flex-col">
            <Link to="/" className="font-headline-lg text-headline-lg text-white font-bold tracking-tighter uppercase">
              ACE
            </Link>
            <p className="font-body-md text-body-md text-white/50 mt-3 max-w-xs leading-relaxed">
              A high-performance ecosystem within Brototype, bridging baseline learning and elite, production-grade engineering.
            </p>
          </div>

          {/* Column 2: Navigation */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/40 mb-2">
                {col.heading}
              </span>
              {col.links.map(l => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-body-md text-body-md text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Column 3: Connect & Contact */}
          <div className="flex flex-col gap-4 items-start">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/40 mb-2">Connect</span>
            <a href={`mailto:${import.meta.env.VITE_ORGANIZATION_EMAIL}`} className="font-body-md text-body-md text-white/60 hover:text-white transition-colors">
              {import.meta.env.VITE_ORGANIZATION_EMAIL}
            </a>
            <a href="#" className="font-body-md text-body-md text-white/60 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="font-body-md text-body-md text-white/60 hover:text-white transition-colors mb-4">Twitter / X</a>
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              to="/contact"
              className="border border-white/30 text-white font-label-sm text-label-sm uppercase tracking-wider px-8 py-3 hover:bg-white hover:text-neutral-950 transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-16 border-t border-white/10 mt-16">
          <p className="font-mono text-mono text-white/30">
            © {new Date().getFullYear()} ACE Community · Advanced Curriculum for Excellence. All rights reserved.
          </p>
          <p className="font-mono text-mono text-white/20 text-[11px] uppercase tracking-widest">
            Built at Brototype
          </p>
        </div>
      </div>
    </footer>
  );
}
