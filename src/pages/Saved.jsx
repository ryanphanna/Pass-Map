import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import ExhibitDetail from '../components/ExhibitDetail';
import { exhibits } from '../data/sampleData';
import { Bookmark } from 'lucide-react';

const Saved = () => {
  const { savedExhibits } = useApp();
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const savedExhibitsList = exhibits.filter(ex =>
    savedExhibits.includes(ex.id)
  );

  return (
    <div className="min-h-screen bg-accent-cream pb-16">
      {/* Header - Magazine editorial style */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-800 text-white py-16 sm:py-20 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full -translate-y-40 translate-x-40 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-5">
            <Bookmark size={24} strokeWidth={2.5} className="text-accent-gold" />
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2 className="text-headline sm:text-display-sm font-bold mb-3 text-shadow-editorial">
            Saved Exhibits
          </h2>
          <p className="text-body-lg text-white/80 leading-magazine">
            {savedExhibitsList.length === 0
              ? 'Your curated collection awaits'
              : `${savedExhibitsList.length} exhibition${savedExhibitsList.length !== 1 ? 's' : ''} in your collection`
            }
          </p>
        </div>
      </div>

      {/* Content - Refined spacing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12">
        {savedExhibitsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-editorial">
            {savedExhibitsList.map((exhibit) => (
              <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                size="small"
                onClick={() => setSelectedExhibit(exhibit)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 sm:py-32">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-gold to-accent-sage mx-auto mb-8 flex items-center justify-center">
              <Bookmark className="text-white" size={36} strokeWidth={2} />
            </div>
            <h3 className="text-title-lg font-bold text-neutral-900 mb-4">
              No Saved Exhibits
            </h3>
            <p className="text-body text-neutral-600 max-w-md mx-auto leading-magazine">
              Bookmark exhibitions from the Discover page to create your personal collection
            </p>
          </div>
        )}
      </div>

      {/* Exhibit Detail Modal */}
      {selectedExhibit && (
        <ExhibitDetail 
          exhibit={selectedExhibit} 
          onClose={() => setSelectedExhibit(null)} 
        />
      )}
    </div>
  );
};

export default Saved;
