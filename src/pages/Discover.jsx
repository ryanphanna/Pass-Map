import { useApp } from '../context/AppContext';
import ExhibitCard from '../components/ExhibitCard';
import ReciprocalCard from '../components/ReciprocalCard';
import {
  exhibits,
  getExhibitsEndingSoon,
  getFreeAccessOpportunities,
  getExhibitsByInterests,
  reciprocalBenefits,
  getInstitutionById
} from '../data/sampleData';
import { Clock, Gift, Sparkles } from 'lucide-react';

const Discover = () => {
  const { userInterests, userMemberships, visitHistory } = useApp();

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
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Discover Toronto
          </h2>
          <p className="text-gray-300 text-lg">
            Curated cultural experiences just for you
          </p>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-8">
            {/* Section Header */}
            <div className="flex items-center space-x-2 mb-4">
              <section.icon className={`${section.color}`} size={24} />
              <h3 className="text-xl font-bold text-gray-900">
                {section.title}
              </h3>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
              {section.id === 'reciprocals' ? (
                // Reciprocal benefits cards
                section.items.map((item) => (
                  <ReciprocalCard key={item.id} reciprocal={item} />
                ))
              ) : (
                // Exhibit cards with varied sizes
                section.items.map((item, index) => {
                  // Vary the card sizes for visual interest
                  let size = 'medium';
                  if (sectionIndex === 0 && index === 0) size = 'large'; // First card in first section
                  if (section.items.length === 1) size = 'wide';
                  if (index % 3 === 2) size = 'small';

                  return (
                    <ExhibitCard
                      key={item.id}
                      exhibit={item}
                      size={size}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {sections.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Welcome to Culture Toronto
            </h3>
            <p className="text-gray-500">
              Set your interests in Settings to get personalized recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
