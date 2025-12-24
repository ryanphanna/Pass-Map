import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import ExhibitDetail from '../components/ExhibitDetail';
import ReciprocalCard from '../components/ReciprocalCard';
import TipCard from '../components/TipCard';
import Onboarding from '../components/Onboarding';
import {
  exhibits,
  getExhibitsEndingSoon,
  getFreeAccessOpportunities,
  getExhibitsByInterests,
  reciprocalBenefits
} from '../data/sampleData';
import { Sparkles } from 'lucide-react';

const Discover = ({ onNavigate }) => {
  const { userInterests, userMemberships, visitHistory, userLocation } = useApp();
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if this is the user's first visit
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleGoToSettings = () => {
    handleCloseOnboarding();
    if (onNavigate) {
      onNavigate('settings');
    }
  };

  // Get curated content
  const endingSoon = getExhibitsEndingSoon(30);
  const freeAccess = getFreeAccessOpportunities();
  const interestMatched = getExhibitsByInterests(userInterests);

  // Get reciprocal benefits for user's memberships
  const userReciprocals = reciprocalBenefits.filter(rb =>
    userMemberships.some(m =>
      m.institutionId === rb.fromInstitutionId &&
      m.tier === rb.membershipTier
    )
  );

  // Find institutions user hasn't visited in a while (or at all)
  const getNotRecentlyVisited = () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return exhibits.filter(ex => {
      const visit = visitHistory.find(v => v.institutionId === ex.institutionId);
      if (!visit) return true; // Never visited
      return new Date(visit.lastVisit) < threeMonthsAgo;
    }).slice(0, 3);
  };

  const notRecentlyVisited = getNotRecentlyVisited();

  // Cultural tips and insights to sprinkle throughout the mood board
  const culturalTips = [
    {
      id: 'tip-reciprocal',
      type: 'membership',
      title: 'Your membership unlocks more than you think',
      description: 'Many cultural institutions offer reciprocal benefits. Check your membership card for the reciprocal icon.',
      label: 'Pro Tip'
    },
    {
      id: 'tip-free',
      type: 'insider',
      title: 'Free culture nights are everywhere',
      description: 'Most museums offer free admission on select evenings or afternoons. Check their websites for "Community Access" or "Free First Thursdays".',
      label: 'Insider Tip'
    },
    {
      id: 'tip-timing',
      type: 'insider',
      title: 'Visit on weekday mornings',
      description: 'Avoid crowds by visiting cultural institutions on weekday mornings. You\'ll have galleries almost to yourself and can truly immerse in the art.',
      label: 'Pro Tip'
    },
    {
      id: 'tip-explore',
      type: 'neighborhood',
      title: 'Explore by neighborhood',
      description: 'Group visits by area to discover hidden gems. Many neighborhoods have clusters of galleries, museums, and cultural spaces within walking distance.',
      label: 'Explore'
    },
    {
      id: 'tip-special',
      type: 'favorite',
      title: 'Temporary exhibits are worth it',
      description: 'Special exhibitions often showcase rare artifacts and artwork that may never return. Don\'t miss these limited-time opportunities.',
      label: 'Don\'t Miss'
    }
  ];

  // Create a fluid mood board grid mixing all content types with INTELLIGENT PACKING
  const createMoodBoardGrid = () => {
    const rawItems = [];

    // Gather all available content (same priority logic as before)
    
    // Priority 1: Ending soon (urgent!)
    if (endingSoon.length > 0) {
      rawItems.push({ type: 'exhibit', data: endingSoon[0], priority: 1 });
      if (endingSoon.length > 1) {
        rawItems.push({ type: 'exhibit', data: endingSoon[1], priority: 1 });
      }
    }

    // Priority 2: Free access + tip
    if (freeAccess.length > 0 && culturalTips[1]) {
      rawItems.push({ type: 'tip', data: culturalTips[1], priority: 2 });
    }
    if (freeAccess.length > 0) {
      rawItems.push({ type: 'exhibit', data: freeAccess[0], priority: 2 });
      if (freeAccess.length > 1) {
        rawItems.push({ type: 'exhibit', data: freeAccess[1], priority: 2 });
      }
    }

    // Priority 3: Reciprocal benefits
    if (userReciprocals.length > 0) {
      if (culturalTips[0]) {
        rawItems.push({ type: 'tip', data: culturalTips[0], priority: 3 });
      }
      userReciprocals.slice(0, 2).forEach(recip => {
        rawItems.push({ type: 'reciprocal', data: recip, priority: 3 });
      });
    }

    // Priority 4: More tips
    if (culturalTips[2]) {
      rawItems.push({ type: 'tip', data: culturalTips[2], priority: 4 });
    }

    // Priority 5: Interest-matched exhibits
    const availableInterestMatched = interestMatched
      .filter(ex => !endingSoon.includes(ex) && !freeAccess.includes(ex))
      .slice(0, 10);
    availableInterestMatched.forEach(exhibit => {
      rawItems.push({ type: 'exhibit', data: exhibit, priority: 5 });
    });

    // More tips sprinkled in
    if (culturalTips[3]) {
      rawItems.splice(Math.floor(rawItems.length * 0.5), 0, 
        { type: 'tip', data: culturalTips[3], priority: 4 });
    }
    if (culturalTips[4]) {
      rawItems.splice(Math.floor(rawItems.length * 0.7), 0, 
        { type: 'tip', data: culturalTips[4], priority: 4 });
    }

    // Priority 6: Not recently visited
    notRecentlyVisited.forEach(exhibit => {
      rawItems.push({ type: 'exhibit', data: exhibit, priority: 6 });
    });

    // SMART PACKING ALGORITHM - NO MORE GAPS!
    // Grid is 4 columns. Sizes: wide=4, large=3, medium=2, small=1
    const packed = [];
    let rowWidth = 0;
    const GRID_COLS = 4;

    const getSizeForItem = (item, index) => {
      // First item should be hero
      if (index === 0 && item.priority === 1) return 'large';
      
      // Reciprocals always medium (they span 2 cols in their component)
      if (item.type === 'reciprocal') return 'medium';
      
      // Vary tip sizes for visual interest
      if (item.type === 'tip') {
        return index % 3 === 0 ? 'medium' : 'small';
      }
      
      // Exhibits get variety based on priority
      if (item.type === 'exhibit') {
        // High priority = bigger cards
        if (item.priority <= 2) {
          return index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small';
        }
        // Lower priority = mostly medium/small
        return index % 4 === 0 ? 'medium' : 'small';
      }
      
      return 'small';
    };

    const getColSpan = (size) => {
      switch(size) {
        case 'wide': return 4;
        case 'large': return 3;
        case 'medium': return 2;
        case 'small': return 1;
        default: return 1;
      }
    };

    rawItems.forEach((item, index) => {
      const desiredSize = getSizeForItem(item, index);
      let size = desiredSize;
      let cols = getColSpan(size);

      // INTELLIGENT PACKING: If item doesn't fit in current row, downsize it
      const spaceLeft = GRID_COLS - rowWidth;
      
      if (cols > spaceLeft) {
        // Item won't fit - try to find a size that WILL fit
        if (spaceLeft >= 2) {
          size = 'medium';
          cols = 2;
        } else if (spaceLeft >= 1) {
          size = 'small';
          cols = 1;
        } else {
          // No space left in row - start new row
          rowWidth = 0;
          // Keep original size for new row
          size = desiredSize;
          cols = getColSpan(size);
        }
      }

      // Add item with its final size
      packed.push({ ...item, size });
      rowWidth += cols;

      // Reset row if we've filled it exactly
      if (rowWidth >= GRID_COLS) {
        rowWidth = 0;
      }
    });

    return packed;
  };

  const moodBoardItems = createMoodBoardGrid();

  return (
    <div className="min-h-screen bg-accent-cream pb-20">
      {/* Minimal Hero - Magazine masthead style */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white py-16 sm:py-20 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full -translate-y-48 translate-x-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-sage/10 rounded-full translate-y-32 -translate-x-48 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={20} className="text-accent-gold" strokeWidth={2.5} />
            <span className="text-caption text-white/70 uppercase tracking-widest">Curated For You</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 text-shadow-editorial leading-none">
            Discover
          </h1>
          <p className="text-body-lg text-white/75 max-w-2xl leading-magazine">
            An evolving collection of cultural experiences tailored to your interests
          </p>
        </div>
      </div>

      {/* Mood Board Grid - Fluid bento layout with NO GAPS */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-8">
        {moodBoardItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-editorial">
            {moodBoardItems.map((item, index) => {
              switch (item.type) {
                case 'exhibit':
                  return (
                    <ExhibitCard
                      key={`exhibit-${item.data.id}-${index}`}
                      exhibit={item.data}
                      size={item.size}
                      onClick={() => setSelectedExhibit(item.data)}
                    />
                  );
                case 'reciprocal':
                  return (
                    <ReciprocalCard
                      key={`reciprocal-${item.data.id}-${index}`}
                      reciprocal={item.data}
                    />
                  );
                case 'tip':
                  return (
                    <TipCard
                      key={`tip-${item.data.id}-${index}`}
                      tip={item.data}
                      size={item.size}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        ) : (
          /* Empty State - Elegant design */
          <div className="text-center py-24 sm:py-32 bg-white rounded-3xl shadow-soft">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-gold to-accent-sage mx-auto mb-8 flex items-center justify-center">
              <Sparkles className="text-white" size={36} strokeWidth={2} />
            </div>
            <h2 className="text-title-lg font-bold text-neutral-900 mb-4">
              Welcome to Your Cultural Guide
            </h2>
            <p className="text-body text-neutral-600 max-w-md mx-auto leading-magazine">
              Set your interests and memberships in Settings to unlock personalized cultural discoveries
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

      {/* Onboarding Modal - shown on first visit */}
      {showOnboarding && (
        <Onboarding
          onClose={handleCloseOnboarding}
          onGoToSettings={handleGoToSettings}
        />
      )}
    </div>
  );
};

export default Discover;
