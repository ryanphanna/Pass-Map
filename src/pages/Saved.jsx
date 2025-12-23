import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import { exhibits } from '../data/sampleData';
import { Bookmark } from 'lucide-react';

const Saved = () => {
  const { savedExhibits } = useApp();

  const savedExhibitsList = exhibits.filter(ex =>
    savedExhibits.includes(ex.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Saved Exhibits
          </h2>
          <p className="text-gray-600">
            {savedExhibitsList.length === 0
              ? 'No saved exhibits yet'
              : `${savedExhibitsList.length} exhibit${savedExhibitsList.length !== 1 ? 's' : ''} saved`
            }
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {savedExhibitsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedExhibitsList.map((exhibit) => (
              <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                size="small"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bookmark className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Saved Exhibits
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Bookmark exhibits from the Discover page to save them here for later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
