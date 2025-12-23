import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import ExhibitDetail from '../components/ExhibitDetail';
import ReciprocalCard from '../components/ReciprocalCard';
import {
  exhibits,
  getExhibitsEndingSoon,
  getFreeAccessOpportunities,
  getExhibitsByInterests,
  reciprocalBenefits
} from '../data/sampleData';
import { Clock, Gift, Sparkles } from 'lucide-react';

const Discover = () => {
  const { userInterests, userMemberships, visitHistory, userLocation } = useApp();
  const [selectedExhibit, setSelectedExhibit] = useState(null);

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

  // Create sections for the feed
  const sections = [];

  // Section 1: Ending Soon (if any)
  if (endingSoon.length > 0) {
    sections.push({
      id: 'ending-soon',
      title: 'Ending Soon',
      icon: Clock,
      color: 'text-red-500',
      items: endingSoon.slice(0, 2)
    });
  }

  // Section 2: Member Benefits (if user has memberships)
  if (userReciprocals.length > 0) {
    sections.push({
      id: 'reciprocals',
      title: 'Your Member Benefits',
      icon: Gift,
      color: 'text-purple-500',
      items: userReciprocals.slice(0, 2)
    });
  }

  // Section 3: Free Access
  if (freeAccess.length > 0) {
    sections.push({
      id: 'free-access',
      title: 'Free Access',
      icon: Gift,
      color: 'text-green-500',
      items: freeAccess.slice(0, 2)
    });
  }

  // Section 4: Haven't Visited Recently
  if (notRecentlyVisited.length > 0) {
    sections.push({
      id: 'revisit',
      title: 'Worth Another Visit',
      icon: Sparkles,
      color: 'text-blue-500',
      items: notRecentlyVisited
    });
  }

  // Section 5: Interest Matched
  sections.push({
    id: 'interest-matched',
    title: 'Based on Your Interests',
    icon: Sparkles,
    color: 'text-indigo-500',
    items: interestMatched.filter(ex => !endingSoon.includes(ex)).slice(0, 4)
  });

  return (
    <div className="min-h-screen bg-accent-cream pb-16">
      {/* Hero Section - Magazine editorial style */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/20 rounded-full -translate-y-48 translate-x-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-sage/20 rounded-full translate-y-48 -translate-x-48 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-accent-sage rounded-full" />
            <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Your Cultural Guide</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black mb-5 text-shadow-editorial leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Discover {userLocation.city || 'Culture'}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            Curated cultural experiences tailored to your interests and memberships
          </p>
        </div>
      </div>

      {/* Feed - Magazine layout with generous spacing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-12">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-16 sm:mb-20">
            {/* Section Header - Refined typography */}
            <div className="mb-8 sm:mb-10 bg-white rounded-2xl p-6 shadow-soft border-l-4 border-accent-gold">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-sage rounded-xl flex items-center justify-center shadow-soft">
                  <section.icon
                    className="text-white"
                    size={24}
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {section.title}
                  </h3>
                  {section.id === 'ending-soon' && (
                    <p className="text-sm text-neutral-600 font-medium mt-1">
                      Don't miss these limited-time exhibitions
                    </p>
                  )}
                  {section.id === 'reciprocals' && (
                    <p className="text-sm text-neutral-600 font-medium mt-1">
                      Exclusive access through your memberships
                    </p>
                  )}
                  {section.id === 'free-access' && (
                    <p className="text-sm text-neutral-600 font-medium mt-1">
                      Experience culture at no cost
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bento Grid - Dynamic layouts */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-editorial">
              {section.id === 'reciprocals' ? (
                // Reciprocal benefits cards
                section.items.map((item) => (
                  <ReciprocalCard key={item.id} reciprocal={item} />
                ))
              ) : (
                // Exhibit cards with sophisticated varied sizes
                section.items.map((item, index) => {
                  // More dynamic size variation for visual focal points
                  let size = 'medium';

                  // First section gets a hero card
                  if (sectionIndex === 0 && index === 0) {
                    size = 'large';
                  }
                  // Create visual hierarchy with varied sizes
                  else if (section.items.length >= 4) {
                    if (index === 0) size = 'large';
                    else if (index === 1 || index === 2) size = 'medium';
                    else size = 'small';
                  }
                  else if (section.items.length === 3) {
                    if (index === 0) size = 'medium';
                    else size = 'small';
                  }
                  else if (section.items.length === 2) {
                    size = 'medium';
                  }

                  return (
                    <ExhibitCard
                      key={item.id}
                      exhibit={item}
                      size={size}
                      onClick={() => setSelectedExhibit(item)}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}

        {/* Empty State - Elegant design */}
        {sections.length === 0 && (
          <div className="text-center py-24 sm:py-32">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-gold to-accent-sage mx-auto mb-8 flex items-center justify-center">
              <Sparkles className="text-white" size={36} strokeWidth={2} />
            </div>
            <h3 className="text-title-lg font-bold text-neutral-900 mb-4">
              Welcome to Culture {userLocation.city || 'Discovery'}
            </h3>
            <p className="text-body text-neutral-600 max-w-md mx-auto leading-magazine">
              Set your interests in Settings to receive personalized cultural recommendations
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

export default Discover;
