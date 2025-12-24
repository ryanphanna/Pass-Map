import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Load saved state from localStorage
  const [savedExhibits, setSavedExhibits] = useState(() => {
    const saved = localStorage.getItem('savedExhibits');
    return saved ? JSON.parse(saved) : [];
  });

  const [userMemberships, setUserMemberships] = useState(() => {
    const saved = localStorage.getItem('userMemberships');
    return saved ? JSON.parse(saved) : [];
  });

  const [userInterests, setUserInterests] = useState(() => {
    const saved = localStorage.getItem('userInterests');
    return saved ? JSON.parse(saved) : ['art', 'culture', 'family'];
  });

  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem('userLocation');
    return saved ? JSON.parse(saved) : { city: null, neighborhood: null, lat: null, lng: null };
  });

  const [visitHistory, setVisitHistory] = useState(() => {
    const saved = localStorage.getItem('visitHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('savedExhibits', JSON.stringify(savedExhibits));
  }, [savedExhibits]);

  useEffect(() => {
    localStorage.setItem('userMemberships', JSON.stringify(userMemberships));
  }, [userMemberships]);

  useEffect(() => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem('userLocation', JSON.stringify(userLocation));
  }, [userLocation]);

  useEffect(() => {
    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
  }, [visitHistory]);

  // Toggle saved exhibit
  const toggleSavedExhibit = (exhibitId) => {
    setSavedExhibits(prev => {
      if (prev.includes(exhibitId)) {
        return prev.filter(id => id !== exhibitId);
      }
      return [...prev, exhibitId];
    });
  };

  // Check if exhibit is saved
  const isExhibitSaved = (exhibitId) => {
    return savedExhibits.includes(exhibitId);
  };

  // Add/remove membership
  const toggleMembership = (institutionId, tier) => {
    setUserMemberships(prev => {
      const existing = prev.find(m => m.institutionId === institutionId);
      if (existing) {
        return prev.filter(m => m.institutionId !== institutionId);
      }
      return [...prev, { institutionId, tier }];
    });
  };

  // Check if user has membership
  const hasMembership = (institutionId) => {
    return userMemberships.some(m => m.institutionId === institutionId);
  };

  // Get user's membership for an institution
  const getMembership = (institutionId) => {
    return userMemberships.find(m => m.institutionId === institutionId);
  };

  // Toggle interest
  const toggleInterest = (interest) => {
    setUserInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      }
      return [...prev, interest];
    });
  };

  // Mark institution as visited
  const markVisited = (institutionId) => {
    const now = new Date().toISOString();
    setVisitHistory(prev => {
      const updated = [...prev];
      const existing = updated.find(v => v.institutionId === institutionId);
      if (existing) {
        existing.lastVisit = now;
        existing.visitCount += 1;
      } else {
        updated.push({
          institutionId,
          lastVisit: now,
          visitCount: 1
        });
      }
      return updated;
    });
  };

  // Get last visit date for institution
  const getLastVisit = (institutionId) => {
    const visit = visitHistory.find(v => v.institutionId === institutionId);
    return visit ? new Date(visit.lastVisit) : null;
  };

  const value = {
    isLoading,
    setIsLoading,
    savedExhibits,
    toggleSavedExhibit,
    isExhibitSaved,
    userMemberships,
    toggleMembership,
    hasMembership,
    getMembership,
    userInterests,
    toggleInterest,
    userLocation,
    setUserLocation,
    visitHistory,
    markVisited,
    getLastVisit
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
