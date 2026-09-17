import { useState } from 'react';
import { PARTNER_LOGOS } from '../constants/placementDatas';

// Repeat 4 times so half-track is wide enough for seamless infinite looping across all screen sizes
const EXTENDED_PARTNERS = [
  ...PARTNER_LOGOS,
  ...PARTNER_LOGOS,
  ...PARTNER_LOGOS,
  ...PARTNER_LOGOS,
];

export default function PartnerLogosMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Soft gradient edge fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Single-line continuous auto-scrolling track */}
      <div
        className="partner-marquee-track"
        style={isPaused ? { animationPlayState: 'paused' } : undefined}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {EXTENDED_PARTNERS.map((partner, i) => {
          const src = typeof partner === 'string' ? partner : partner.src;
          const name = typeof partner === 'string' ? '' : partner.name;
          const isWhiteLogo =
            typeof partner === 'object' &&
            (partner.type === 'white' ||
              partner.name === 'KubeNine' ||
              partner.name === 'e& (Etisalat and)');

          return (
            <div
              key={`${name}-${i}`}
              className="w-[210px] sm:w-[240px] md:w-[260px] aspect-[4/3] sm:aspect-square shrink-0 border border-outline-variant bg-surface-container-lowest flex flex-col items-center justify-between p-6 hover:bg-surface-container-low hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="w-full flex-1 flex items-center justify-center min-h-[60px]">
                <img
                  referrerPolicy="no-referrer"
                  style={isWhiteLogo ? { filter: 'brightness(0)' } : undefined}
                  className="max-h-12 max-w-[85%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  src={src}
                  alt={name || 'Partner company logo'}
                />
              </div>
              {name && (
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-medium text-center mt-2 group-hover:text-primary transition-colors">
                  {name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
