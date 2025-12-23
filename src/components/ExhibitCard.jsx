import { useState } from 'react';
import { Bookmark, Clock, MapPin, Gift, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInstitutionById } from '../data/sampleData';

const ExhibitCard = ({ exhibit, size = 'medium', onClick }) => {
  const { isExhibitSaved, toggleSavedExhibit } = useApp();
  const institution = getInstitutionById(exhibit.institutionId);
  const isSaved = isExhibitSaved(exhibit.id);
  const [imageError, setImageError] = useState(false);

  // Calculate days until end
  const getDaysUntilEnd = () => {
    if (!exhibit.endDate || exhibit.isPermanent) return null;
    const now = new Date();
    const end = new Date(exhibit.endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilEnd = getDaysUntilEnd();
  const isEndingSoon = daysUntilEnd !== null && daysUntilEnd <= 7;

  // Magazine-style size classes with more variation
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
    wide: 'col-span-full'
  };

  const heightClasses = {
    small: 'h-[320px] sm:h-[380px]',
    medium: 'h-[420px] sm:h-[480px]',
    large: 'h-[500px] sm:h-[580px] md:h-[650px]',
    wide: 'h-[400px] sm:h-[450px]'
  };

  // Sophisticated overlay based on card size and variant
  const getOverlayStyle = () => {
    if (size === 'large') return 'image-overlay-editorial';
    if (size === 'wide') return 'image-overlay-side';
    return 'image-overlay-subtle';
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSavedExhibit(exhibit.id);
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${exhibit.title}`}
      className={`
        ${sizeClasses[size]}
        ${heightClasses[size]}
        relative overflow-hidden cursor-pointer group
        hover-elevate image-magazine-hover
        ${size === 'large' ? 'rounded-3xl shadow-medium hover:shadow-editorial' : 'rounded-2xl shadow-soft hover:shadow-strong'}
      `}
    >
      {/* Image with magazine-style treatment */}
      <div className="relative w-full h-full bg-gradient-to-br from-primary-700 via-primary-600 to-accent-sage overflow-hidden">
        {!imageError ? (
          <img
            src={exhibit.image}
            alt={exhibit.title}
            onError={() => setImageError(true)}
            className="absolute inset-0 w-full h-full object-cover image-magazine"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-800 via-neutral-800 to-accent-slate">
            <div className="text-center px-8">
              <Sparkles className="mx-auto mb-4 text-accent-gold opacity-40" size={size === 'large' ? 64 : 48} strokeWidth={1.5} />
              <div className="text-sm text-white/40 font-medium">{institution?.name}</div>
            </div>
          </div>
        )}
        {/* Sophisticated gradient overlay */}
        <div className={`absolute inset-0 ${getOverlayStyle()}`} />

        {/* Save button - refined design */}
        <button
          onClick={handleSave}
          className={`
            absolute top-5 right-5 sm:top-6 sm:right-6 p-3 rounded-full
            backdrop-editorial transition-magazine-fast z-10
            ${isSaved
              ? 'bg-accent-cream text-neutral-900 shadow-soft'
              : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
            }
          `}
          aria-label={isSaved ? 'Remove from saved' : 'Save exhibit'}
        >
          <Bookmark
            size={size === 'large' ? 22 : 20}
            fill={isSaved ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Badges - sophisticated styling */}
        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 flex flex-col gap-2 z-10">
          {/* Free badge */}
          {exhibit.isFree && (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-sage/90 backdrop-editorial text-white text-overline rounded-full shadow-soft">
              <Gift size={14} strokeWidth={2.5} />
              <span>Free Access</span>
            </div>
          )}

          {/* Ending soon badge */}
          {isEndingSoon && (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-terracotta/95 backdrop-editorial text-white text-overline rounded-full shadow-soft animate-pulse">
              <Clock size={14} strokeWidth={2.5} />
              <span>Ending Soon</span>
            </div>
          )}
        </div>

        {/* Content - improved hierarchy */}
        <div className={`absolute bottom-0 left-0 right-0 ${size === 'large' ? 'p-8 sm:p-10' : size === 'wide' ? 'p-6 sm:p-8' : 'p-5 sm:p-7'}`}>
          {/* Institution - more elegant */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-1 rounded-full bg-accent-gold" />
            <span className="text-overline text-white/80 tracking-wide">
              {institution?.name}
            </span>
          </div>

          {/* Title - bold magazine typography */}
          <h3 className={`
            font-bold text-white mb-3 line-clamp-2 text-shadow-editorial
            ${size === 'large' ? 'text-title-lg sm:text-headline' : size === 'wide' ? 'text-title sm:text-title-lg' : 'text-xl sm:text-title'}
          `}>
            {exhibit.title}
          </h3>

          {/* Description - refined typography */}
          {(size === 'large' || size === 'wide' || size === 'medium') && (
            <p className={`
              text-white/85 mb-4 line-clamp-2 text-shadow-soft leading-magazine
              ${size === 'large' ? 'text-body-lg' : 'text-body'}
            `}>
              {exhibit.description}
            </p>
          )}

          {/* Metadata - sophisticated badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {daysUntilEnd !== null && daysUntilEnd > 0 && !isEndingSoon && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-soft rounded-full text-caption text-white/90">
                <Clock size={14} strokeWidth={2} />
                <span>
                  {daysUntilEnd === 1
                    ? 'Ends tomorrow'
                    : `${daysUntilEnd} days`
                  }
                </span>
              </div>
            )}

            {exhibit.isPermanent && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-soft rounded-full text-caption text-white/90">
                <Sparkles size={14} strokeWidth={2} />
                <span>Permanent</span>
              </div>
            )}

            {exhibit.isFree && exhibit.freeAccessDetails && (
              <div className="px-3 py-1.5 bg-accent-sage/30 backdrop-soft rounded-full text-caption text-white/95 font-medium">
                {exhibit.freeAccessDetails.days.join(' • ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitCard;
