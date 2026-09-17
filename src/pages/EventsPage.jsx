import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SPOTLIGHT_EVENT } from '../constants/eventDatas';

// Clean Lightbox for Poster Preview
function PosterModal({ isOpen, onClose, posterSrc, altText }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full max-h-[92vh] flex flex-col items-center cursor-default"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute -top-12 right-0 w-9 h-9 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
        <img
          src={posterSrc}
          alt={altText}
          className="w-auto max-h-[88vh] object-contain border border-white/10 shadow-2xl"
        />
      </div>
    </div>,
    document.body
  );
}

export default function EventsPage() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const event = SPOTLIGHT_EVENT;

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary font-body-md pt-16 min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Page Header */}
        <header className="mb-16 max-w-3xl">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter">
            Events & Workshops
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Curated gatherings, engineering keynotes, and milestone launches within the ACE community. Join our community for deep dives into architecture, design systems, and engineering excellence.
          </p>
        </header>

        {/* Spotlight Event Card - Editorial Split Architecture */}
        <article className="border border-outline-variant bg-surface overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Poster Filling Container */}
            <div
              onClick={() => setIsPosterModalOpen(true)}
              className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-outline-variant overflow-hidden group cursor-pointer min-h-[420px] sm:min-h-[500px] lg:min-h-full bg-surface-container-low"
            >
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              {/* Bottom Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1.5 bg-black/85 backdrop-blur-xs text-white font-mono text-xs font-medium border border-white/10 shadow-sm">
                  {event.venue}
                </span>
                <span className="px-3 py-1.5 bg-black/85 backdrop-blur-xs text-accent font-mono text-xs font-semibold border border-white/10 flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                  Expand
                </span>
              </div>
            </div>

            {/* Right: Editorial Typography & Content */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Meta Header */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>

                {/* Main Headline */}
                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight leading-tight mb-4">
                  {event.title}
                </h2>

                {/* Subtitle / Tagline */}
                <p className="font-body-md text-base text-on-surface-variant leading-relaxed mb-8">
                  {event.tagline}
                </p>

                {/* Structured Data Rows (Clean editorial table style) */}
                <div className="border-t border-b border-outline-variant divide-y divide-outline-variant mb-8">
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                      Date & Time
                    </span>
                    <span className="font-body-md text-sm font-semibold text-primary">
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                      Venue
                    </span>
                    <span className="font-body-md text-sm font-semibold text-primary">
                      {event.venue}
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                      Orchestrated By
                    </span>
                    <span className="font-body-md text-sm text-primary">
                      ACE Members & Coordinators
                    </span>
                  </div>
                  <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                      Key Highlights
                    </span>
                    <span className="font-body-md text-sm text-primary text-right">
                      Public Speaking • ACE Results • Website Launch • ACE Forge • Cash Prize
                    </span>
                  </div>
                </div>

                {/* Featured Quote Callout (Matches Alumni & Landing Page styling) */}
                <div className="p-6 bg-surface-container-low border-l-2 border-accent mb-8">
                  <h4 className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Program Objective
                  </h4>
                  <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                    "{event.objective}"
                  </p>
                </div>
              </div>

              {/* Slogan */}
              <div className="pt-2">
                <span className="font-mono text-xs text-on-surface-variant italic">
                  "{event.slogan}"
                </span>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Poster Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        posterSrc={event.poster}
        altText={event.title}
      />
    </div>
  );
}
