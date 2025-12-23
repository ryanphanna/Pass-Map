import { X, MapPin, Clock, Gift, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { getInstitutionById } from '../data/sampleData';

const ExhibitDetail = ({ exhibit, onClose }) => {
  const institution = getInstitutionById(exhibit.institutionId);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-editorial max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/90 hover:bg-white shadow-soft transition-magazine z-10"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* Hero image */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
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
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Institution */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-1 rounded-full bg-accent-gold" />
            <span className="text-overline text-neutral-600 tracking-wide">
              {institution?.name}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-headline font-bold text-neutral-900 mb-4">
            {exhibit.title}
          </h2>

          {/* Description */}
          <p className="text-body text-neutral-700 leading-relaxed mb-6">
            {exhibit.description}
          </p>

          {/* Metadata */}
          <div className="space-y-4 mb-8">
            {/* Dates */}
            {!exhibit.isPermanent && (exhibit.startDate || exhibit.endDate) && (
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-neutral-500 mt-1" strokeWidth={2} />
                <div>
                  <div className="text-caption font-semibold text-neutral-900 mb-1">
                    Exhibition Period
                  </div>
                  <div className="text-body text-neutral-600">
                    {exhibit.startDate && formatDate(exhibit.startDate)}
                    {exhibit.startDate && exhibit.endDate && ' — '}
                    {exhibit.endDate && formatDate(exhibit.endDate)}
                    {daysUntilEnd !== null && (
                      <span className="ml-2 text-accent-terracotta font-medium">
                        ({daysUntilEnd} {daysUntilEnd === 1 ? 'day' : 'days'} left)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            {institution?.location && (
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-neutral-500 mt-1" strokeWidth={2} />
                <div>
                  <div className="text-caption font-semibold text-neutral-900 mb-1">
                    Location
                  </div>
                  <div className="text-body text-neutral-600">
                    {institution.location.address}
                    {institution.location.neighborhood && (
                      <span className="text-neutral-500">
                        {' '}• {institution.location.neighborhood}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Free access details */}
            {exhibit.isFree && exhibit.freeAccessDetails && (
              <div className="flex items-start gap-3">
                <Gift size={20} className="text-accent-sage mt-1" strokeWidth={2} />
                <div>
                  <div className="text-caption font-semibold text-neutral-900 mb-1">
                    Free Access
                  </div>
                  <div className="text-body text-neutral-600">
                    {exhibit.freeAccessDetails.days.join(', ')}
                    {exhibit.freeAccessDetails.times && (
                      <span> • {exhibit.freeAccessDetails.times}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to action */}
          {institution?.website && (
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-magazine shadow-soft hover:shadow-strong"
            >
              <span className="font-semibold">Visit Website</span>
              <ExternalLink size={18} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitDetail;
