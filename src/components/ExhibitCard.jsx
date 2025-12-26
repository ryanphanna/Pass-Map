import { useState } from 'react';
import { Bookmark, Clock, MapPin, Gift, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInstitutionById } from '../data/sampleData';

const ExhibitCard = ({ exhibit, size = 'medium', onClick, style }) => {
  const { isExhibitSaved, toggleSavedExhibit } = useApp();
  const institution = getInstitutionById(exhibit.institutionId);
  const isSaved = isExhibitSaved(exhibit.id);
  const [imageError, setImageError] = useState(false);

  // Calculate days until end
  const getDaysUntilEnd = () => {
    if (!exhibit.endDate || exhibit.isPermanent) return null;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const end = new Date(exhibit.endDate);
    end.setHours(0, 0, 0, 0);

    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : null;
  };

  const daysUntilEnd = getDaysUntilEnd();
  const isEndingSoon = daysUntilEnd !== null && daysUntilEnd <= 7;

  // Magazine-style size classes with more variation
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
    wide: 'col-span-full',
    custom: '' // For grid positioning
  };

  const heightClasses = {
    small: 'h-[400px] sm:h-[450px]',
    medium: 'h-[500px] sm:h-[550px]',
    large: 'h-[600px] sm:h-[700px] md:h-[750px]',
    wide: 'h-[450px] sm:h-[500px]',
    custom: 'h-full' // Fill grid cell
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
      style={style}
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
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
            <div className="text-center px-8">
              <Sparkles className="mx-auto mb-4 text-accent-gold opacity-60" size={size === 'large' ? 64 : 48} strokeWidth={1.5} />
              <div className="text-sm text-white/60 font-medium">{institution?.name}</div>
            </div>
          </div>
        )}
        {/* Sophisticated gradient overlay - ALWAYS applied */}
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

        {/* Content - MUCH bolder typography */}
        <div className={`absolute bottom-0 left-0 right-0 ${size === 'large' ? 'p-8 sm:p-12' : size === 'wide' ? 'p-6 sm:p-8' : 'p-6 sm:p-8'}`}>
          {/* Institution - more elegant */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="text-overline text-white/90 tracking-wider">
              {institution?.name}
            </span>
          </div>

          {/* Title - MASSIVELY BOLD magazine typography */}
          <h3 className={`
            font-black text-white mb-4 line-clamp-2 text-shadow-editorial leading-tight tracking-tight break-words
            ${size === 'large' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : size === 'wide' ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'}
          `}>
            {exhibit.title}
          </h3>

          {/* Description - refined typography */}
          {(size === 'large' || size === 'wide') && (
            <p className={`
              text-white/90 mb-5 line-clamp-2 text-shadow-soft leading-relaxed
              ${size === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}
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
