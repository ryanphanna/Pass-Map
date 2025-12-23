import { X, MapPin, Calendar, Clock, Gift, ExternalLink, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInstitutionById } from '../data/sampleData';

const ExhibitDetail = ({ exhibit, onClose }) => {
  const { isExhibitSaved, toggleSavedExhibit } = useApp();
  const institution = getInstitutionById(exhibit.institutionId);
  const isSaved = isExhibitSaved(exhibit.id);

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

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    toggleSavedExhibit(exhibit.id);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-editorial max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={exhibit.image}
            alt={exhibit.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 backdrop-editorial rounded-full text-white transition-magazine-fast"
            aria-label="Close"
          >
            <X size={24} strokeWidth={2} />
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`
              absolute top-4 left-4 p-3 rounded-full backdrop-editorial transition-magazine-fast
              ${isSaved
                ? 'bg-accent-cream text-neutral-900 shadow-soft'
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
              }
            `}
            aria-label={isSaved ? 'Remove from saved' : 'Save exhibit'}
          >
            <Bookmark
              size={22}
              fill={isSaved ? 'currentColor' : 'none'}
              strokeWidth={2}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-20 flex gap-2">
            {exhibit.isFree && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-sage/90 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Gift size={14} strokeWidth={2.5} />
                <span>Free Access</span>
              </div>
            )}
            {daysUntilEnd !== null && daysUntilEnd <= 7 && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-terracotta/95 backdrop-editorial text-white text-overline rounded-full shadow-soft">
                <Clock size={14} strokeWidth={2.5} />
                <span>Ending Soon</span>
              </div>
            )}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-accent-gold" />
              <span className="text-overline text-white/80 tracking-wide">
                {institution?.name}
              </span>
            </div>
            <h1 className="text-title-lg sm:text-headline font-bold text-white text-shadow-editorial">
              {exhibit.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-16rem)] sm:max-h-[calc(90vh-20rem)] md:max-h-[calc(90vh-24rem)]">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-title font-bold text-neutral-900 mb-3">About This Exhibit</h2>
            <p className="text-body-lg text-neutral-700 leading-magazine">
              {exhibit.description}
            </p>
          </div>

          {/* Date Information */}
          {!exhibit.isPermanent && (exhibit.startDate || exhibit.endDate) && (
            <div className="mb-8 p-5 bg-accent-cream/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <Calendar className="text-accent-terracotta mt-1" size={20} strokeWidth={2} />
                <div>
                  <h3 className="text-body font-bold text-neutral-900 mb-2">Exhibition Dates</h3>
                  <div className="text-body text-neutral-700">
                    {exhibit.startDate && (
                      <p>Opens: {formatDate(exhibit.startDate)}</p>
                    )}
                    {exhibit.endDate && (
                      <p>Closes: {formatDate(exhibit.endDate)}</p>
                    )}
                    {daysUntilEnd !== null && (
                      <p className="mt-2 text-accent-terracotta font-medium">
                        {daysUntilEnd === 1
                          ? 'Ends tomorrow!'
                          : `${daysUntilEnd} days remaining`
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {exhibit.isPermanent && (
            <div className="mb-8 p-5 bg-accent-sage/20 rounded-2xl">
              <div className="flex items-start gap-3">
                <Calendar className="text-accent-sage" size={20} strokeWidth={2} />
                <div>
                  <h3 className="text-body font-bold text-neutral-900 mb-2">Permanent Collection</h3>
                  <p className="text-body text-neutral-700">
                    This exhibit is part of the permanent collection and is available year-round.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Free Access Details */}
          {exhibit.isFree && exhibit.freeAccessDetails && (
            <div className="mb-8 p-5 bg-accent-sage/20 rounded-2xl">
              <div className="flex items-start gap-3">
                <Gift className="text-accent-sage mt-1" size={20} strokeWidth={2} />
                <div>
                  <h3 className="text-body font-bold text-neutral-900 mb-2">Free Access</h3>
                  <p className="text-body text-neutral-700">
                    <span className="font-medium">{exhibit.freeAccessDetails.days.join(', ')}</span>
                    {exhibit.freeAccessDetails.times && (
                      <span> • {exhibit.freeAccessDetails.times}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Location */}
          {institution?.location && (
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="text-neutral-600 mt-1" size={20} strokeWidth={2} />
                <div>
                  <h3 className="text-body font-bold text-neutral-900 mb-1">Location</h3>
                  <p className="text-body text-neutral-700">{institution.location.address}</p>
                  <p className="text-caption text-neutral-600">{institution.location.neighborhood}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institution.location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-caption text-neutral-900 transition-magazine-fast font-medium"
              >
                Get Directions
                <ExternalLink size={14} strokeWidth={2} />
              </a>
            </div>
          )}

          {/* Visit Website */}
          {institution?.website && (
            <div className="pt-6 border-t border-neutral-200">
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-magazine-fast font-medium shadow-soft hover:shadow-strong"
              >
                Visit {institution.shortName || institution.name} Website
                <ExternalLink size={16} strokeWidth={2} />
              </a>
              <p className="text-caption text-neutral-600 mt-3">
                Check the website for current hours, admission prices, and tickets.
              </p>
            </div>
          )}

          {/* Interests Tags */}
          {exhibit.interests && exhibit.interests.length > 0 && (
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="text-body font-bold text-neutral-900 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {exhibit.interests.map(interest => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 bg-neutral-100 text-caption text-neutral-700 rounded-full font-medium capitalize"
                  >
                    {interest.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitDetail;
