import { Bookmark, Clock, MapPin, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getInstitutionById } from '../data/sampleData';

const ExhibitCard = ({ exhibit, size = 'medium', variant = 'default' }) => {
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
    return diffDays;
  };

  const daysUntilEnd = getDaysUntilEnd();

  // Size classes for bento grid
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 sm:col-span-2 row-span-1',
    large: 'col-span-1 sm:col-span-2 row-span-2',
    wide: 'col-span-full row-span-1'
  };

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSavedExhibit(exhibit.id);
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md
        transition-all duration-300 cursor-pointer group
      `}
    >
      {/* Image */}
      <div className="relative h-full min-h-[200px]">
        <img
          src={exhibit.image}
          alt={exhibit.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`
            absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all
            ${isSaved
              ? 'bg-white text-gray-900'
              : 'bg-white/30 text-white hover:bg-white/50'
            }
          `}
          aria-label={isSaved ? 'Remove from saved' : 'Save exhibit'}
        >
          <Bookmark
            size={20}
            fill={isSaved ? 'currentColor' : 'none'}
          />
        </button>

        {/* Free badge */}
        {exhibit.isFree && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            FREE
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          {/* Institution */}
          <div className="flex items-center space-x-2 mb-2">
            <MapPin size={14} className="text-white/80" />
            <span className="text-xs sm:text-sm text-white/90 font-medium">
              {institution?.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
            {exhibit.title}
          </h3>

          {/* Description */}
          {size !== 'small' && (
            <p className="text-sm text-white/80 mb-3 line-clamp-2">
              {exhibit.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
            {daysUntilEnd !== null && daysUntilEnd > 0 && (
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>
                  {daysUntilEnd === 1
                    ? 'Ends tomorrow'
                    : `${daysUntilEnd} days left`
                  }
                </span>
              </div>
            )}

            {exhibit.isPermanent && (
              <span className="px-2 py-1 bg-white/10 rounded-full">
                Permanent Collection
              </span>
            )}

            {exhibit.isFree && exhibit.freeAccessDetails && (
              <div className="flex items-center space-x-1">
                <Gift size={14} />
                <span>{exhibit.freeAccessDetails.days.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitCard;
