import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SPOTLIGHT_EVENT } from '../constants/eventDatas';

// Clean Lightbox for Poster Preview
function PosterModal({ isOpen, onClose, posterSrc, altText, statusText }) {
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
        <div className="relative">
          <img
            src={posterSrc}
            alt={altText}
            className="w-auto max-h-[88vh] object-contain border border-white/10 shadow-2xl"
          />
          {statusText && (
            <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-white font-mono text-xs border border-white/20 shadow-xl rounded-full flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(252,172,4,0.8)]"></span>
              {statusText}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function EventsPage() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const event = SPOTLIGHT_EVENT;

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary font-body-md min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 md:pb-20">
        {/* Page Header */}
        <header className="mb-8 max-w-3xl">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3 tracking-tighter">
            Events & Workshops
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Curated gatherings, engineering keynotes, and milestone launches within the ACE community. Join our community for deep dives into architecture, design systems, and engineering excellence.
          </p>
        </header>

        {/* Spotlight Event Card - Editorial Split Architecture */}
        <article className="border border-outline-variant bg-surface overflow-hidden mb-12 max-w-5xl mx-auto shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[400px]">
            {/* Left: Compact Poster Container */}
            <div
              onClick={() => setIsPosterModalOpen(true)}
              className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-outline-variant overflow-hidden group cursor-pointer h-[280px] sm:h-[340px] lg:h-full bg-surface-container-low"
            >
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* Light Blur Overlay for Completed Event */}
              {event.isCompleted && (
                <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center transition-all duration-300">
                  <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl backdrop-saturate-150 border border-white/15 shadow-[0_16px_40px_rgba(0,15,40,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] rounded-[20px] px-5 py-3.5 sm:px-6 sm:py-4 max-w-[85%] sm:max-w-[250px] transition-all duration-300 group-hover:scale-[1.03] group-hover:bg-slate-900/70 group-hover:border-white/25 group-hover:shadow-[0_20px_48px_rgba(0,15,40,0.55)]">
                    {/* Top specular highlight shimmer */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    {/* Main Title */}
                    <h3 className="font-display-lg text-xl sm:text-2xl text-white font-semibold tracking-tight leading-tight drop-shadow-sm">
                      Wrapped up
                    </h3>

                    {/* Date Footer */}
                    <div className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-white/10 text-white/75 font-mono text-[11px] tracking-wide">
                      <span className="material-symbols-outlined text-[14px] text-accent">event_available</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Venue Pill */}
              <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10">
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white/90 font-mono text-[10px] font-medium border border-white/15 rounded-full shadow-sm">
                  {event.venue}
                </span>
              </div>
            </div>

            {/* Right: Editorial Typography & Content */}
            <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                  {event.isCompleted && (
                    <span className="px-2.5 py-0.5 bg-surface-container-high border border-outline-variant text-primary font-mono text-[10px] font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      Wrapped up
                    </span>
                  )}
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>

                {/* Main Headline */}
                <h2 className="font-headline-lg text-lg sm:text-xl lg:text-2xl text-primary font-bold tracking-tight leading-snug mb-1.5">
                  {event.title}
                </h2>

                {/* Subtitle / Tagline */}
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 line-clamp-2">
                  {event.tagline}
                </p>

                {/* Structured Data Rows */}
                <div className="border-t border-b border-outline-variant divide-y divide-outline-variant mb-3 text-xs">
                  <div className="py-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                      Venue
                    </span>
                    <span className="font-body-md text-xs font-semibold text-primary">
                      {event.venue}
                    </span>
                  </div>
                  <div className="py-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                      Orchestrated By
                    </span>
                    <span className="font-body-md text-xs text-primary">
                      ACE Members & Coordinators
                    </span>
                  </div>
                  <div className="py-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                      Key Highlights
                    </span>
                    <span className="font-body-md text-xs text-primary text-right">
                      Public Speaking • ACE Results • Website Launch • ACE Forge • Cash Prize
                    </span>
                  </div>
                </div>

                {/* Featured Quote Callout */}
                <div className="p-3 bg-surface-container-low border-l-2 border-accent mb-2">
                  <h4 className="font-label-sm text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">
                    Program Objective
                  </h4>
                  <p className="font-body-md text-xs text-on-surface italic leading-relaxed line-clamp-2">
                    "{event.objective}"
                  </p>
                </div>
              </div>

              {/* Slogan */}
              <div className="pt-0.5">
                <span className="font-mono text-[11px] text-on-surface-variant italic">
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
        statusText={event.statusText}
      />
    </div>
  );
}
