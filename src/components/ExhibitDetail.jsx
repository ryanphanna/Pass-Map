import { useEffect } from 'react';
import { X, MapPin, Clock, Gift, ExternalLink, Calendar, Sparkles, DollarSign, Accessibility, Bookmark, Share2, Check } from 'lucide-react';
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-detail-title"
    >
      <div
        className="relative bg-neutral-50 w-full h-full md:h-auto md:rounded-3xl shadow-editorial md:max-w-4xl md:max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - elegant design */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/95 hover:bg-white shadow-soft hover:shadow-medium transition-magazine z-20 backdrop-editorial"
          aria-label="Close"
        >
          <X size={20} strokeWidth={2} className="text-neutral-900" />
        </button>

        {/* FULL-BLEED HERO IMAGE with overlaid title */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden md:rounded-t-3xl">
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover"
          />
          {/* Sophisticated editorial overlay */}
          <div className="absolute inset-0 image-overlay-editorial" />

          {/* Badges positioned on image */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            {exhibit.isFree && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-sage/90 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Gift size={14} strokeWidth={2.5} />
                <span>Free Access</span>
              </div>
            )}
            {exhibit.isPermanent && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-gold/90 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Sparkles size={14} strokeWidth={2.5} />
                <span>Permanent</span>
              </div>
            )}
            {daysUntilEnd !== null && daysUntilEnd <= 7 && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-terracotta/95 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Clock size={14} strokeWidth={2.5} />
                <span>Ending Soon</span>
              </div>
            )}
          </div>

          {/* Title and institution overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            {/* Institution - elegant overline style */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-1 rounded-full bg-accent-gold" />
              <span className="text-overline text-white/90 tracking-wide">
                {institution?.name}
              </span>
            </div>

            {/* Title - bold magazine typography with text shadow */}
            <h2 id="exhibit-detail-title" className="text-headline md:text-display-sm font-bold text-white mb-4 text-shadow-editorial leading-tight-magazine">
              {exhibit.title}
            </h2>
          </div>
        </div>

        {/* EDITORIAL CONTENT LAYOUT */}
        <div className="p-6 md:p-12 gap-editorial">

          {/* Description Section - flowing, magazine-style */}
          <div className="mb-10">
            <p className="text-body-lg text-neutral-700 leading-magazine">
              {exhibit.description}
            </p>
          </div>

          {/* Exhibition Period - if applicable */}
          {!exhibit.isPermanent && (exhibit.startDate || exhibit.endDate) && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Exhibition Period</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8">
                <div className="flex items-center justify-center gap-3 text-body text-neutral-700">
                  <Calendar size={20} className="text-accent-gold" strokeWidth={2} />
                  <div className="text-center">
                    <span className="font-semibold">{exhibit.startDate && formatDate(exhibit.startDate)}</span>
                    {exhibit.startDate && exhibit.endDate && <span className="mx-3 text-neutral-400">—</span>}
                    <span className="font-semibold">{exhibit.endDate && formatDate(exhibit.endDate)}</span>
                  </div>
                </div>
                {daysUntilEnd !== null && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cream rounded-full text-caption text-accent-terracotta font-semibold">
                      <Clock size={14} strokeWidth={2.5} />
                      {daysUntilEnd} {daysUntilEnd === 1 ? 'day' : 'days'} remaining
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Free Access Details - if applicable */}
          {exhibit.isFree && exhibit.freeAccessDetails && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Free Access</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="bg-gradient-to-br from-accent-sage/10 to-accent-sage/5 rounded-3xl shadow-soft p-6 md:p-8 border border-accent-sage/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-accent-sage/20">
                    <Gift size={24} className="text-accent-sage" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-body font-semibold text-neutral-900 mb-2">
                      Complimentary admission on select days
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exhibit.freeAccessDetails.days.map((day, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white rounded-full text-caption text-accent-sage font-semibold shadow-soft">
                          {day}
                        </span>
                      ))}
                    </div>
                    {exhibit.freeAccessDetails.times && (
                      <div className="mt-3 text-body text-neutral-600">
                        {exhibit.freeAccessDetails.times}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hours Section - elegant presentation */}
          {institution?.hours && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Hours</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl shadow-soft p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-neutral-100">
                      <Clock size={20} className="text-neutral-600" strokeWidth={2} />
                    </div>
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider">Weekdays</div>
                  </div>
                  <div className="text-body-lg font-semibold text-neutral-900">
                    {institution.hours.weekday}
                  </div>
                </div>
                <div className="bg-white rounded-3xl shadow-soft p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-neutral-100">
                      <Clock size={20} className="text-neutral-600" strokeWidth={2} />
                    </div>
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider">Weekends</div>
                  </div>
                  <div className="text-body-lg font-semibold text-neutral-900">
                    {institution.hours.weekend}
                  </div>
                </div>
              </div>
              {institution.hours.note && (
                <div className="mt-4 px-5 py-3 bg-accent-cream rounded-2xl">
                  <p className="text-caption text-neutral-600 text-center">{institution.hours.note}</p>
                </div>
              )}
            </div>
          )}

          {/* Admission Prices - refined grid layout */}
          {institution?.admission && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Admission</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider mb-2">Adult</div>
                    <div className="text-title-lg font-bold text-neutral-900">{institution.admission.adult}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider mb-2">Senior</div>
                    <div className="text-title-lg font-bold text-neutral-900">{institution.admission.senior}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider mb-2">Youth</div>
                    <div className="text-title-lg font-bold text-neutral-900">{institution.admission.youth}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-caption font-bold text-neutral-500 uppercase tracking-wider mb-2">Child</div>
                    <div className="text-title-lg font-bold text-neutral-900">{institution.admission.child}</div>
                  </div>
                </div>
                {institution.admission.note && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <div className="flex items-center justify-center gap-2 text-body text-accent-sage font-medium">
                      <Sparkles size={16} strokeWidth={2} />
                      <span>{institution.admission.note}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location - with map pin */}
          {institution?.location && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Location</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-neutral-100">
                    <MapPin size={24} className="text-neutral-700" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-body-lg font-semibold text-neutral-900 mb-1">
                      {institution.location.address}
                    </div>
                    {institution.location.neighborhood && (
                      <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-neutral-100 rounded-full">
                        <span className="text-caption text-neutral-600 font-medium">{institution.location.neighborhood}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility - elegant badges with icons */}
          {institution?.accessibility && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-accent-gold/30" />
                <h3 className="text-title font-bold text-neutral-900">Accessibility</h3>
                <div className="h-px flex-1 bg-accent-gold/30" />
              </div>
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8">
                <div className="flex flex-wrap gap-3">
                  {institution.accessibility.wheelchair && (
                    <div className="flex items-center gap-2 px-5 py-3 bg-accent-cream rounded-2xl shadow-soft">
                      <Accessibility size={18} className="text-accent-gold" strokeWidth={2} />
                      <span className="text-body font-medium text-neutral-900">Wheelchair Accessible</span>
                    </div>
                  )}
                  {institution.accessibility.parking && (
                    <div className="flex items-center gap-2 px-5 py-3 bg-accent-cream rounded-2xl shadow-soft">
                      <MapPin size={18} className="text-accent-gold" strokeWidth={2} />
                      <span className="text-body font-medium text-neutral-900">{institution.accessibility.parking}</span>
                    </div>
                  )}
                  {institution.accessibility.assistance && (
                    <div className="flex items-center gap-2 px-5 py-3 bg-accent-cream rounded-2xl shadow-soft">
                      <Sparkles size={18} className="text-accent-gold" strokeWidth={2} />
                      <span className="text-body font-medium text-neutral-900">{institution.accessibility.assistance}</span>
                    </div>
                  )}
                  {institution.accessibility.features && institution.accessibility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-5 py-3 bg-accent-cream rounded-2xl shadow-soft">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      <span className="text-body font-medium text-neutral-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action buttons - sophisticated design */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => toggleSavedExhibit(exhibit.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full transition-magazine font-semibold shadow-soft hover:shadow-medium
                ${isExhibitSaved(exhibit.id)
                  ? 'bg-accent-gold text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }
              `}
            >
              <Bookmark
                size={18}
                strokeWidth={2}
                fill={isExhibitSaved(exhibit.id) ? 'currentColor' : 'none'}
              />
              <span>{isExhibitSaved(exhibit.id) ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => {
                markVisited(exhibit.institutionId);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-700 hover:bg-neutral-50 transition-magazine font-semibold shadow-soft hover:shadow-medium"
            >
              <Check size={18} strokeWidth={2} />
              <span>Mark Visited</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: exhibit.title,
                    text: exhibit.description,
                    url: window.location.href
                  }).catch(() => {
                    // User cancelled or error occurred
                  });
                } else {
                  // Fallback: copy to clipboard
                  try {
                    navigator.clipboard.writeText(window.location.href);
                  } catch (error) {
                    // Clipboard API not available
                    console.error('Failed to copy to clipboard', error);
                  }
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-700 hover:bg-neutral-50 transition-magazine font-semibold shadow-soft hover:shadow-medium"
            >
              <Share2 size={18} strokeWidth={2} />
              <span>Share</span>
            </button>
          </div>

          {/* Call to action - prominent button */}
          {institution?.website && (
            <div className="text-center">
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-magazine shadow-medium hover:shadow-strong text-body-lg font-semibold"
              >
                <span>Visit Website</span>
                <ExternalLink size={20} strokeWidth={2} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitDetail;
