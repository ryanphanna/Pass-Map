import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import ExhibitDetail from '../components/ExhibitDetail';
import ReciprocalCard from '../components/ReciprocalCard';
import TipCard from '../components/TipCard';
import Onboarding from '../components/Onboarding';
import Map from '../components/Map';
import {
  exhibits,
  institutions,
  getExhibitsEndingSoon,
  getFreeAccessOpportunities,
  getExhibitsByInterests,
  reciprocalBenefits
} from '../data/sampleData';
import { sortByDistance } from '../utils/distance';
import { Sparkles, MapPin, Map as MapIcon, Grid, Navigation as NavigationIcon } from 'lucide-react';

const Discover = ({ onNavigate }) => {
  const { userInterests, userMemberships, visitHistory, userLocation, setUserLocation } = useApp();
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [showNearMeOnly, setShowNearMeOnly] = useState(false);
  const [sortedInstitutions, setSortedInstitutions] = useState(institutions);
  const [locationPermission, setLocationPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'

  // Check if this is the user's first visit - initialize onboarding state
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);
  
  useEffect(() => {
    if (!hasCheckedOnboarding) {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
      setHasCheckedOnboarding(true);
    }
  }, [hasCheckedOnboarding]);

  // Request user's geolocation
  useEffect(() => {
    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        try {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          setLocationPermission(permission.state);

          if (permission.state === 'granted' || permission.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setUserLocation(prev => ({
                  city: prev?.city || 'Toronto',
                  neighborhood: prev?.neighborhood || null,
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }));
                setLocationPermission('granted');
              },
              (error) => {
                console.log('Geolocation error:', error);
                setLocationPermission('denied');
              }
            );
          }
        } catch (error) {
          console.log('Permission query error:', error);
        }
      }
    };

    getUserLocation();
  }, [setUserLocation]); // Only depend on setUserLocation (stable function)

  // Sort institutions by distance when user location changes
  const sortedInstitutionsByDistance = useMemo(() => {
    if (userLocation?.lat && userLocation?.lng) {
      return sortByDistance(institutions, userLocation);
    }
    return institutions;
  }, [userLocation]);

  useEffect(() => {
    setSortedInstitutions(sortedInstitutionsByDistance);
  }, [sortedInstitutionsByDistance]);

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

  // Filter institutions for "Near me" (within 10km)
  const getFilteredInstitutions = () => {
    if (showNearMeOnly && userLocation?.lat && userLocation?.lng) {
      return sortedInstitutions.filter(inst => inst.distance && inst.distance <= 10);
    }
    return sortedInstitutions;
  };

  const filteredInstitutions = getFilteredInstitutions();

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

    // Get size dimensions for an item: [cols, rows]
    const getSizeForItem = (item, index) => {
      // First item should be hero (2×2)
      if (index === 0 && item.priority === 1) return [2, 2];
      
      // Reciprocals: wide rectangles (2×1) - always single row
      if (item.type === 'reciprocal') return [2, 1];
      
      // Tips: mostly small, occasional variety
      if (item.type === 'tip') {
        if (index % 7 === 0) return [2, 2]; // Rare large square
        if (index % 4 === 0) return [2, 1]; // Occasional wide
        return [1, 1]; // Mostly small squares
      }
      
      // Exhibits: create variety but favor smaller sizes
      if (item.type === 'exhibit') {
        if (item.priority <= 2) {
          // High priority exhibits get occasional big sizes
          if (index % 6 === 0) return [2, 2]; // Rare large square
          if (index % 4 === 0) return [1, 2]; // Occasional tall
          if (index % 3 === 0) return [2, 1]; // Occasional wide
          return [1, 1]; // Mostly small
        }
        // Lower priority = almost all small, with rare variety
        if (index % 8 === 0) return [2, 1]; // Very occasional wide
        if (index % 10 === 0) return [1, 2]; // Very occasional tall
        return [1, 1]; // Default small
      }
      
      return [1, 1]; // Default: small square
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

      {/* View Controls & Location Info */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-8 mb-6">
        <div className="bg-white rounded-2xl shadow-soft p-4 flex flex-wrap items-center justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-700 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Grid size={18} className="inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-primary-700 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <MapIcon size={18} className="inline mr-2" />
              Map
            </button>
          </div>

          {/* Near Me Filter */}
          {userLocation?.lat && userLocation?.lng && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNearMeOnly(!showNearMeOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  showNearMeOnly
                    ? 'bg-accent-sage text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <NavigationIcon size={18} />
                Near Me (10km)
              </button>
              <span className="text-sm text-neutral-600">
                {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Location Status */}
          {locationPermission === 'denied' && (
            <div className="text-sm text-neutral-600 flex items-center gap-2">
              <MapPin size={16} />
              <span>Enable location for distance info</span>
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
          <Map
            institutions={filteredInstitutions}
            userLocation={userLocation}
            onInstitutionClick={(institution) => {
              // Find exhibits for this institution and show the first one
              const institutionExhibits = exhibits.filter(
                ex => ex.institutionId === institution.id
              );
              if (institutionExhibits.length > 0) {
                setSelectedExhibit(institutionExhibits[0]);
              }
            }}
          />
        </div>
      )}

      {/* Mood Board Grid - Fluid bento layout with 2D packing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {moodBoardItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-editorial auto-rows-[320px]">
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
