import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EVENT_DATA } from '../constants/eventDatas';



function CarouselModal({ event, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (!event) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % event.carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [event]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-surface-container-lowest w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-lg border border-outline-variant shadow-2xl flex flex-col transform transition-transform duration-300 scale-100"
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant text-primary hover:bg-surface-variant transition-colors" 
          onClick={onClose}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
        </button>

        {/* Image/Poster Section */}
        <div className="w-full border-outline-variant min-h-[300px] bg-surface-variant relative border-b flex-shrink-0">
          <div className="relative h-full w-full overflow-hidden group">
            <div 
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {event.carouselImages.map((src, idx) => (
                <div key={idx} className="min-w-full h-[300px] md:h-[400px]">
                  <img src={src} className="w-full h-full object-cover" alt={`Event slide ${idx + 1}`} />
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + event.carouselImages.length) % event.carouselImages.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-sm p-1 rounded-full border border-outline-variant opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % event.carouselImages.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-sm p-1 rounded-full border border-outline-variant opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {event.carouselImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${currentIndex === idx ? 'bg-primary' : 'bg-outline-variant'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full p-8 md:p-12 flex flex-col md:px-margin-desktop mt-6 sm:p-10 mt-8">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider rounded-sm mb-4">
              {event.category || 'Event'}
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight mb-4 tracking-tight">
              {event.title}
            </h2>
            <div className="flex flex-col space-y-2 mb-6 border-b border-outline-variant pb-6">
              <div className="flex items-center text-secondary">
                <span className="material-symbols-outlined mr-3" style={{ fontSize: '20px' }}>calendar_today</span>
                <span className="font-body-md text-body-md">{event.date}</span>
              </div>
              <div className="flex items-center text-secondary">
                <span className="material-symbols-outlined mr-3" style={{ fontSize: '20px' }}>location_on</span>
                <span className="font-body-md text-body-md font-medium text-primary">ACE HQ</span>
              </div>
            </div>
          </div>
          <div className="prose max-w-none mb-8">
            <h3 className="font-headline-md text-headline-md text-primary mb-3">About this session</h3>
            <p className="font-body-md text-body-md text-secondary mb-4 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  return (
    <div className="bg-surface text-on-surface antialiased font-body-md pt-16 min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Header Section */}
        <div className="mb-section-gap max-w-3xl">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter">Events & Workshops</h1>
          <p className="font-body-lg text-body-lg text-secondary">Cultivating technical mastery through shared experiences. Join our community for deep dives into architecture, design systems, and engineering excellence.</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {EVENT_DATA.map((event, idx) => (
            <article 
              key={idx}
              onClick={() => setSelectedEvent(event)}
              className="group bg-surface-container-lowest border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors duration-200 rounded flex flex-col overflow-hidden cursor-pointer h-full"
            >
              <div className="h-48 w-full border-b border-outline-variant relative bg-surface-variant overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={event.carouselImages[0]} 
                  alt={event.title} 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="font-headline-md text-headline-md text-primary leading-tight mb-2">
                    {event.title}
                  </h3>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mt-1">
                    {event.date}
                  </p>
                </div>
                <p className="font-body-md text-body-md text-secondary line-clamp-2 mb-6">
                  {event.description}
                </p>
                <div className="mt-auto pt-4 border-t border-outline-variant">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary group-hover:text-secondary transition-colors inline-flex items-center">
                    View Details <span className="material-symbols-outlined ml-1" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Render Modal outside normal flow */}
      <CarouselModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
