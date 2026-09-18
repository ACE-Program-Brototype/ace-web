import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants/navLinks';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();

  // Close mobile menu on route change and reset scroll smoothly
  const close = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    // { href: '/#manifesto', label: 'STORY', isHash: true },
    { to: '/directory', label: 'DIRECTORY', isHash: false },
    { to: '/outcomes', label: 'OUTCOMES', isHash: false },
    // { to: '/journal', label: 'JOURNAL', isHash: false },
    { to: '/events', label: 'EVENTS', isHash: false },
    { to: '/handlers', label: 'HANDLERS', isHash: false },
    { to: '/alumni', label: 'ALUMNI', isHash: false },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

        {/* Brand */}
        <Link to="/" onClick={close} className="flex items-center">
          <img src="/logo.png" alt="ACE" className="h-6 md:h-7 w-auto object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center font-label-sm text-label-sm uppercase tracking-wider">
          {navLinks.map(link =>
            link.isHash ? (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant font-medium pb-1 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                key={link.label}
                to={link.to}
                className={`font-medium pb-1 transition-colors ${location.pathname === link.to
                  ? 'text-primary border-b-2 border-accent'
                  : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-6">
          {/* <button
            onClick={() => setSearchOpen(s => !s)}
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button> */}
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            to="/contact"
            className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-6 py-2 border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          className="md:hidden text-primary"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Search Drawer */}
      {searchOpen && (
        <div className="border-t border-outline-variant bg-surface-container-lowest py-3 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search students, articles, domains…"
              className="flex-1 bg-transparent outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface-container-lowest">
          <div className="flex flex-col px-margin-mobile py-4 gap-4 font-label-sm text-label-sm uppercase tracking-wider">
            {navLinks.map(link =>
              link.isHash ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className="text-on-surface-variant hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={close}
                  className={`${location.pathname === link.to
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/contact"
              onClick={close}
              className="bg-primary text-on-primary px-6 py-2 text-center border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200"
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
