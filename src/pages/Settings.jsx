import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { institutions } from '../data/sampleData';
import { Check, X } from 'lucide-react';

const Settings = () => {
  const {
    userMemberships,
    toggleMembership,
    userInterests,
    toggleInterest,
    userLocation,
    setUserLocation
  } = useApp();

  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedTier, setSelectedTier] = useState('');

  const availableInterests = [
    { id: 'art', label: 'Art', emoji: '🎨' },
    { id: 'culture', label: 'Culture', emoji: '🏛️' },
    { id: 'history', label: 'History', emoji: '📜' },
    { id: 'science', label: 'Science', emoji: '🔬' },
    { id: 'nature', label: 'Nature', emoji: '🌿' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'space', label: 'Space', emoji: '🚀' },
    { id: 'animals', label: 'Animals', emoji: '🦁' },
    { id: 'music', label: 'Music', emoji: '🎵' },
    { id: 'craft', label: 'Craft', emoji: '✂️' },
    { id: 'environment', label: 'Environment', emoji: '🌍' },
    { id: 'canadian', label: 'Canadian', emoji: '🍁' }
  ];

  const handleAddMembership = (e) => {
    e.preventDefault();
    if (selectedInstitution && selectedTier) {
      toggleMembership(selectedInstitution, selectedTier);
      setSelectedInstitution('');
      setSelectedTier('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Settings
          </h2>
          <p className="text-gray-600">
            Manage your preferences and memberships
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Interests Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Your Interests
          </h3>
          <p className="text-gray-600 mb-6">
            Select topics you're interested in to get personalized recommendations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableInterests.map((interest) => {
              const isSelected = userInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
                    transition-all duration-200 border-2
                    ${isSelected
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-xl">{interest.emoji}</span>
                  <span className="text-sm font-medium">{interest.label}</span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Memberships Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Your Memberships
          </h3>
          <p className="text-gray-600 mb-6">
            Add your cultural institution memberships to discover reciprocal benefits
          </p>

          {/* Current Memberships */}
          {userMemberships.length > 0 && (
            <div className="mb-6 space-y-3">
              {userMemberships.map((membership) => {
                const institution = institutions.find(
                  i => i.id === membership.institutionId
                );
                return (
                  <div
                    key={`${membership.institutionId}-${membership.tier}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {institution?.name}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {membership.tier} Membership
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMembership(membership.institutionId, membership.tier)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove membership"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add New Membership */}
          <form onSubmit={handleAddMembership} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution
                </label>
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select an institution</option>
                  {institutions
                    .filter(inst => !userMemberships.some(m => m.institutionId === inst.id))
                    .map(inst => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  disabled={!selectedInstitution}
                >
                  <option value="">Select a tier</option>
                  {selectedInstitution &&
                    institutions
                      .find(i => i.id === selectedInstitution)
                      ?.membershipTiers.map(tier => (
                        <option key={tier} value={tier}>
                          {tier.charAt(0).toUpperCase() + tier.slice(1)}
                        </option>
                      ))
                  }
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedInstitution || !selectedTier}
              className={`
                w-full py-3 px-6 rounded-lg font-medium transition-colors
                ${selectedInstitution && selectedTier
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Add Membership
            </button>
          </form>
        </section>

        {/* Location Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Location
          </h3>
          <p className="text-gray-600 mb-6">
            Your current location helps us show relevant cultural experiences
          </p>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="font-semibold text-gray-900">
              {userLocation.city}
            </div>
            {userLocation.neighborhood && (
              <div className="text-sm text-gray-600">
                {userLocation.neighborhood}
              </div>
            )}
          </div>
        </section>

        {/* Data Section */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Your Data
          </h3>
          <p className="text-gray-600 mb-6">
            All your preferences are stored locally in your browser
          </p>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-6 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Clear All Data
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
