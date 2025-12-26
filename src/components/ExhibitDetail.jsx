import { useEffect } from 'react';
import { X, MapPin, Clock, Gift, ExternalLink, Sparkles, Bookmark, Share2, Check } from 'lucide-react';
import { getInstitutionById } from '../data/sampleData';
import { useApp } from '../context/AppContext';

const ExhibitDetail = ({ exhibit, onClose }) => {
  const institution = getInstitutionById(exhibit.institutionId);
  const { isExhibitSaved, toggleSavedExhibit, markVisited } = useApp();

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!exhibit) return null;

  // Calculate days until end
  const getDaysUntilEnd = () => {
    if (!exhibit.endDate || exhibit.isPermanent) return null;
    const now = new Date();
    const end = new Date(exhibit.endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  };

  const daysUntilEnd = getDaysUntilEnd();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-detail-title"
    >
      <div
        className="relative bg-accent-cream w-full h-full md:h-auto md:rounded-3xl shadow-editorial md:max-w-5xl md:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed md:absolute top-6 right-6 p-3 rounded-full bg-white/95 hover:bg-white shadow-medium hover:shadow-strong transition-magazine z-30 backdrop-editorial"
          aria-label="Close"
        >
          <X size={20} strokeWidth={2.5} className="text-neutral-900" />
        </button>

        {/* FULL-BLEED HERO IMAGE with overlaid title - magazine spread style */}
        <div className="relative h-[45vh] sm:h-[55vh] md:h-[70vh] overflow-hidden md:rounded-t-3xl flex-shrink-0">
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover"
          />

          {/* Sophisticated editorial overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Minimal badges on image */}
          <div className="absolute top-6 left-6 flex gap-2 z-10">
            {exhibit.isFree && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-sage/95 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Gift size={14} strokeWidth={2.5} />
                <span>Free</span>
              </div>
            )}
            {daysUntilEnd !== null && daysUntilEnd <= 7 && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-terracotta/95 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Clock size={14} strokeWidth={2.5} />
                <span>{daysUntilEnd}d left</span>
              </div>
            )}
            {exhibit.isPermanent && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-gold/95 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Sparkles size={14} strokeWidth={2.5} />
                <span>Permanent</span>
              </div>
            )}
          </div>

          {/* Title and institution overlaid on image - magazine hero style */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
            {/* Institution name - elegant overline */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-1 rounded-full bg-accent-gold" />
              <span className="text-overline text-white/90">
                {institution?.name}
              </span>
            </div>

            {/* Exhibit title - bold magazine typography */}
            <h2
              id="exhibit-detail-title"
              className="text-2xl sm:text-headline md:text-display-sm font-black text-white mb-4 text-shadow-editorial leading-tight max-w-4xl break-words"
            >
              {exhibit.title}
            </h2>

            {/* Quick action buttons on hero */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleSavedExhibit(exhibit.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full transition-magazine-fast font-semibold shadow-medium backdrop-editorial
                  ${isExhibitSaved(exhibit.id)
                    ? 'bg-white text-neutral-900'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }
                `}
              >
                <Bookmark
                  size={16}
                  strokeWidth={2.5}
                  fill={isExhibitSaved(exhibit.id) ? 'currentColor' : 'none'}
                />
                <span className="text-caption">{isExhibitSaved(exhibit.id) ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: exhibit.title,
                      text: exhibit.description,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    try {
                      navigator.clipboard.writeText(window.location.href);
                    } catch {
                      // Clipboard write failed, ignore
                    }
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-magazine-fast font-semibold shadow-medium backdrop-editorial"
              >
                <Share2 size={16} strokeWidth={2.5} />
                <span className="text-caption">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* EDITORIAL CONTENT - Flowing magazine article style */}
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">

          {/* Description - lead paragraph style with generous spacing */}
          <p className="text-body md:text-body-lg lg:text-title text-neutral-800 leading-relaxed md:leading-magazine mb-8 md:mb-12 break-words">
            {exhibit.description}
          </p>

          {/* Key Information Grid - Minimal, not list-like */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">

            {/* Hours - if available */}
            {institution?.hours && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={20} className="text-accent-gold" strokeWidth={2} />
                  <h3 className="text-body font-bold text-neutral-900">Hours</h3>
                </div>
                <div className="text-body text-neutral-700 leading-magazine space-y-1">
                  <div>Weekdays: {institution.hours.weekday}</div>
                  <div>Weekends: {institution.hours.weekend}</div>
                </div>
              </div>
            )}

            {/* Admission - if available */}
            {institution?.admission && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={20} className="text-accent-gold" strokeWidth={2} />
                  <h3 className="text-body font-bold text-neutral-900">Admission</h3>
                </div>
                <div className="text-body text-neutral-700 leading-magazine">
                  {exhibit.isFree ? (
                    <span className="text-accent-sage font-semibold">Free Access</span>
                  ) : (
                    <div className="space-y-1">
                      <div>Adult: {institution.admission.adult}</div>
                      <div>Youth: {institution.admission.youth}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location - if available */}
            {institution?.location && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={20} className="text-accent-gold" strokeWidth={2} />
                  <h3 className="text-body font-bold text-neutral-900">Location</h3>
                </div>
                <div className="text-body text-neutral-700 leading-magazine">
                  {institution.location.address}
                  {institution.location.neighborhood && (
                    <div className="text-caption text-neutral-600 mt-1">
                      {institution.location.neighborhood}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Free Access Details - if applicable */}
            {exhibit.isFree && exhibit.freeAccessDetails && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Gift size={20} className="text-accent-sage" strokeWidth={2} />
                  <h3 className="text-body font-bold text-neutral-900">Free Days</h3>
                </div>
                <div className="text-body text-neutral-700 leading-magazine">
                  {exhibit.freeAccessDetails.days.join(', ')}
                  {exhibit.freeAccessDetails.times && (
                    <div className="text-caption text-neutral-600 mt-1">
                      {exhibit.freeAccessDetails.times}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Call to action - elegant button */}
          {institution?.website && (
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-8 border-t border-neutral-300/50">
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-magazine shadow-medium hover:shadow-strong text-body font-semibold"
              >
                <span>Visit Website</span>
                <ExternalLink size={18} strokeWidth={2.5} />
              </a>

              <button
                onClick={() => {
                  markVisited(exhibit.institutionId);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-700 hover:bg-neutral-100 transition-magazine font-semibold shadow-soft hover:shadow-medium border border-neutral-300"
              >
                <Check size={18} strokeWidth={2.5} />
                <span>Mark Visited</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitDetail;
