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
    setUserLocation: _setUserLocation
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
    <div className="min-h-screen bg-accent-cream pb-16">
      {/* Header - Magazine editorial style */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-800 text-white py-16 sm:py-20 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-sage/10 rounded-full -translate-y-40 translate-x-40 blur-3xl" />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-0.5 bg-accent-gold" />
            <span className="text-overline text-white/70">Personalization</span>
          </div>
          <h2 className="text-headline sm:text-display-sm font-bold mb-3 text-shadow-editorial">
            Settings
          </h2>
          <p className="text-body-lg text-white/80 leading-magazine">
            Curate your cultural journey with personalized preferences
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 mt-12 space-y-10">
        {/* Interests Section */}
        <section className="bg-white rounded-3xl shadow-soft p-8 sm:p-10">
          <div className="mb-8">
            <h3 className="text-title-lg font-bold text-neutral-900 mb-3">
              Your Interests
            </h3>
            <p className="text-body text-neutral-600 leading-magazine">
              Select topics to refine your personalized cultural recommendations
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableInterests.map((interest) => {
              const isSelected = userInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    group relative flex items-center justify-center gap-2 px-5 py-4 rounded-2xl
                    transition-magazine border-2
                    ${isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-soft'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-gold hover:shadow-subtle'
                    }
                  `}
                >
                  <span className="text-xl transition-transform group-hover:scale-110">{interest.emoji}</span>
                  <span className="text-caption font-semibold">{interest.label}</span>
                  {isSelected && <Check size={16} strokeWidth={2.5} className="absolute top-2 right-2" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Memberships Section */}
        <section className="bg-white rounded-3xl shadow-soft p-8 sm:p-10">
          <div className="mb-8">
            <h3 className="text-title-lg font-bold text-neutral-900 mb-3">
              Your Memberships
            </h3>
            <p className="text-body text-neutral-600 leading-magazine">
              Add your cultural institution memberships to unlock exclusive reciprocal benefits
            </p>
          </div>

          {/* Current Memberships */}
          {userMemberships.length > 0 && (
            <div className="mb-8 space-y-3">
              {userMemberships.map((membership) => {
                const institution = institutions.find(
                  i => i.id === membership.institutionId
                );
                return (
                  <div
                    key={`${membership.institutionId}-${membership.tier}`}
                    className="group flex items-center justify-between p-5 bg-accent-cream rounded-2xl border border-neutral-200 transition-magazine hover:border-accent-gold hover:shadow-subtle"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-12 bg-gradient-to-b from-accent-gold to-accent-sage rounded-full" />
                      <div>
                        <div className="text-body font-bold text-neutral-900">
                          {institution?.name}
                        </div>
                        <div className="text-caption text-neutral-600 capitalize font-medium">
                          {membership.tier} Membership
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMembership(membership.institutionId, membership.tier)}
                      className="p-2.5 text-accent-terracotta hover:bg-accent-terracotta/10 rounded-xl transition-magazine"
                      aria-label="Remove membership"
                    >
                      <X size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add New Membership */}
          <form onSubmit={handleAddMembership} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-caption font-bold text-neutral-900 mb-3 uppercase tracking-wide">
                  Institution
                </label>
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus-editorial transition-magazine text-body text-neutral-900"
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
                <label className="block text-caption font-bold text-neutral-900 mb-3 uppercase tracking-wide">
                  Membership Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus-editorial transition-magazine text-body text-neutral-900 disabled:bg-neutral-100 disabled:cursor-not-allowed"
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
                w-full py-4 px-6 rounded-2xl font-semibold transition-magazine text-body
                ${selectedInstitution && selectedTier
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-soft hover:shadow-medium'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              Add Membership
            </button>
          </form>
        </section>

        {/* Location Section */}
        <section className="bg-white rounded-3xl shadow-soft p-8 sm:p-10">
          <div className="mb-6">
            <h3 className="text-title-lg font-bold text-neutral-900 mb-3">
              Location
            </h3>
            <p className="text-body text-neutral-600 leading-magazine">
              Your location helps curate relevant cultural experiences nearby
            </p>
          </div>

          <div className="p-6 bg-accent-cream rounded-2xl border border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-accent-gold" />
              <div className="text-body-lg font-bold text-neutral-900">
                {userLocation.city}
              </div>
            </div>
            {userLocation.neighborhood && (
              <div className="text-body text-neutral-600 mt-1 ml-4">
                {userLocation.neighborhood}
              </div>
            )}
          </div>
        </section>

        {/* Data Section */}
        <section className="bg-white rounded-3xl shadow-soft p-8 sm:p-10">
          <div className="mb-6">
            <h3 className="text-title-lg font-bold text-neutral-900 mb-3">
              Your Data
            </h3>
            <p className="text-body text-neutral-600 leading-magazine">
              All preferences are stored locally in your browser for privacy
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-6 py-3 bg-accent-terracotta/10 text-accent-terracotta rounded-2xl font-semibold hover:bg-accent-terracotta/20 transition-magazine"
          >
            Clear All Data
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
