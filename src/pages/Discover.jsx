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
  reciprocalBenefits,
  getInstitutionById
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
  // BUT exclude ones where user already has access to the destination
  const userReciprocals = reciprocalBenefits.filter(rb => {
    // Do you have the "from" membership?
    const hasFromMembership = userMemberships.some(m =>
      m.institutionId === rb.fromInstitutionId &&
      m.tier === rb.membershipTier
    );
    
    if (!hasFromMembership) return false;
    
    // Do you already have the "to" membership?
    const hasToMembership = userMemberships.some(m =>
      m.institutionId === rb.toInstitutionId
    );
    
    // Only show if you DON'T already have access to destination
    return !hasToMembership;
  });

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

  // Create a fluid mood board grid mixing all content types with 2D PACKING
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

    // 2D GRID PACKING ALGORITHM
    // Grid is 4 columns wide, tracks occupied cells across rows
    const GRID_COLS = 4;
    const packed = [];
    
    // Track which cells are occupied: grid[row][col] = true/false
    const grid = [];
    const getCell = (row, col) => {
      if (!grid[row]) grid[row] = [];
      return grid[row][col] || false;
    };
    const setCell = (row, col, value) => {
      if (!grid[row]) grid[row] = [];
      grid[row][col] = value;
    };

    // SCORING SYSTEM - Calculate relevance score for each item
    // Higher score = larger card size
    const calculateRelevanceScore = (item, index) => {
      let score = 0;
      
      // BASE SCORES by content type
      if (item.type === 'exhibit') score += 5;
      if (item.type === 'reciprocal') score += 3;
      if (item.type === 'tip') score += 1;
      
      // TIPS always stay small regardless of other factors
      if (item.type === 'tip') {
        return score; // Return early, tips don't get boosted
      }
      
      // RECIPROCAL-SPECIFIC SCORING
      if (item.type === 'reciprocal') {
        const reciprocal = item.data;
        
        // Penalty if you already have destination membership
        const alreadyHasDestination = userMemberships.some(m => 
          m.institutionId === reciprocal.toInstitutionId
        );
        if (alreadyHasDestination) {
          score -= 8; // Big penalty - you don't need this
        }
        
        return score;
      }
      
      // EXHIBIT-SPECIFIC SCORING
      if (item.type === 'exhibit') {
        const exhibit = item.data;
        
        // Calculate days until ending
        const getDaysUntilEnd = () => {
          if (!exhibit.endDate || exhibit.isPermanent) return null;
          const now = new Date();
          const end = new Date(exhibit.endDate);
          const diffTime = end - now;
          return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };
        const daysLeft = getDaysUntilEnd();
        
        // URGENCY BOOST - ending soon is important!
        if (daysLeft !== null) {
          if (daysLeft <= 3) score += 10;      // URGENT!
          else if (daysLeft <= 7) score += 7;  // Very soon
          else if (daysLeft <= 14) score += 4; // Coming up
          else if (daysLeft <= 30) score += 2; // This month
        }
        
        // INTEREST MATCH BOOST
        const matchesInterests = exhibit.interests?.some(i => 
          userInterests.includes(i)
        );
        if (matchesInterests) score += 5;
        
        // MEMBERSHIP BOOST - you have access
        const hasMembership = userMemberships.some(m => 
          m.institutionId === exhibit.institutionId
        );
        if (hasMembership) score += 4;
        
        // FREE ACCESS BOOST - but only if you don't already have membership
        if (exhibit.isFree && !hasMembership) {
          score += 6; // Free is valuable when you don't have membership
        }
        if (exhibit.isFree && hasMembership) {
          score -= 2; // Free doesn't matter if you already have access
        }
        
        // VISIT HISTORY PENALTY - already been recently
        const recentlyVisited = visitHistory.some(v => {
          if (v.institutionId !== exhibit.institutionId) return false;
          const lastVisit = new Date(v.lastVisit);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return lastVisit > threeMonthsAgo;
        });
        if (recentlyVisited) score -= 4;
        
        // PERMANENT COLLECTION PENALTY - can see anytime
        if (exhibit.isPermanent) score -= 3;
        
        // FIRST ITEM BOOST - hero card
        if (index === 0) score += 3;
      }
      
      return score;
    };
    
    // Convert score to card size [cols, rows]
    const scoreToSize = (score) => {
      if (score >= 15) return [2, 2]; // Large square - very important
      if (score >= 10) return [2, 1]; // Wide - important
      if (score >= 7) return [1, 2];  // Tall - notable
      return [1, 1]; // Small - standard
    };
    
    // Get size for an item using the scoring system
    const getSizeForItem = (item, index) => {
      const score = calculateRelevanceScore(item, index);
      return scoreToSize(score);
    };

    // Find the next available position for a card of given size
    // Try to place as early as possible (top-left) to minimize gaps
    const findPosition = (cols, rows) => {
      // Scan every possible position starting from top-left
      // This ensures we fill gaps aggressively
      for (let row = 0; row < 100; row++) {
        for (let col = 0; col <= GRID_COLS - cols; col++) {
          // Check if this exact position is available
          let canFit = true;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (getCell(row + r, col + c)) {
                canFit = false;
                break;
              }
            }
            if (!canFit) break;
          }
          
          if (canFit) {
            // Found the earliest available position!
            return { row, col };
          }
        }
      }
      
      // Should never reach here
      console.error('Could not find position for card', cols, rows);
      return { row: 0, col: 0 };
    };

    // Mark cells as occupied
    const markOccupied = (row, col, cols, rows) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          setCell(row + r, col + c, true);
        }
      }
    };

    // Pack each item
    rawItems.forEach((item, index) => {
      let [cols, rows] = getSizeForItem(item, index);
      
      // Find position for this card
      const pos = findPosition(cols, rows);
      
      // Mark cells as occupied
      markOccupied(pos.row, pos.col, cols, rows);
      
      // Add to packed items with grid position
      packed.push({
        ...item,
        cols,
        rows,
        gridColumn: `${pos.col + 1} / span ${cols}`,
        gridRow: `${pos.row + 1} / span ${rows}`
      });
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

      {/* Mood Board Grid - Fluid bento layout with 2D packing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-8">
        {moodBoardItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
            {moodBoardItems.map((item, index) => {
              const gridStyle = {
                gridColumn: item.gridColumn,
                gridRow: item.gridRow
              };

              switch (item.type) {
                case 'exhibit':
                  return (
                    <ExhibitCard
                      key={`exhibit-${item.data.id}-${index}`}
                      exhibit={item.data}
                      size="custom"
                      onClick={() => setSelectedExhibit(item.data)}
                      style={gridStyle}
                    />
                  );
                case 'reciprocal':
                  return (
                    <ReciprocalCard
                      key={`reciprocal-${item.data.id}-${index}`}
                      reciprocal={item.data}
                      style={gridStyle}
                    />
                  );
                case 'tip':
                  return (
                    <TipCard
                      key={`tip-${item.data.id}-${index}`}
                      tip={item.data}
                      size="custom"
                      style={gridStyle}
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
