import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { institutions } from '../data/sampleData';
import { Check, X, Sparkles, MapPin } from 'lucide-react';

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
      <div className="relative bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white py-20 sm:py-24 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/20 rounded-full -translate-y-48 translate-x-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-sage/20 rounded-full translate-y-40 -translate-x-40 blur-3xl" />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-accent-sage rounded-full" />
            <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Personalization</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black mb-4 text-shadow-editorial bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Settings
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableInterests.map((interest) => {
              const isSelected = userInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    group relative flex flex-col items-center justify-center gap-3 px-5 py-6 rounded-2xl
                    transition-all duration-300 border-2 hover-elevate
                    ${isSelected
                      ? 'bg-gradient-to-br from-neutral-900 to-neutral-800 text-white border-neutral-900 shadow-medium scale-[1.02]'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-gold hover:bg-accent-cream/30 hover:shadow-soft'
                    }
                  `}
                >
                  <span className="text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{interest.emoji}</span>
                  <span className="text-sm font-bold tracking-wide">{interest.label}</span>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center shadow-soft">
                      <Check size={14} strokeWidth={3} className="text-white" />
                    </div>
                  )}
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
                    className="group relative flex items-center justify-between p-6 bg-gradient-to-br from-white to-accent-cream rounded-2xl border-2 border-neutral-200 transition-all duration-300 hover:border-accent-gold hover:shadow-medium hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-sage rounded-xl flex items-center justify-center shadow-soft">
                        <Sparkles size={24} className="text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-neutral-900">
                          {institution?.name}
                        </div>
                        <div className="text-sm text-neutral-600 capitalize font-semibold mt-0.5">
                          {membership.tier} Membership
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMembership(membership.institutionId, membership.tier)}
                      className="p-3 text-accent-terracotta hover:bg-accent-terracotta/10 rounded-xl transition-all duration-300 hover:rotate-90"
                      aria-label="Remove membership"
                    >
                      <X size={22} strokeWidth={2.5} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add New Membership */}
          <form onSubmit={handleAddMembership} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-3 uppercase tracking-wider">
                  Institution
                </label>
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-neutral-200 rounded-xl focus-editorial transition-all duration-300 text-base text-neutral-900 font-medium hover:border-accent-gold bg-white cursor-pointer"
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
                <label className="block text-xs font-bold text-neutral-900 mb-3 uppercase tracking-wider">
                  Membership Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-neutral-200 rounded-xl focus-editorial transition-all duration-300 text-base text-neutral-900 font-medium hover:border-accent-gold disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                w-full py-5 px-6 rounded-2xl font-bold transition-all duration-300 text-base
                ${selectedInstitution && selectedTier
                  ? 'bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:from-neutral-800 hover:to-neutral-700 shadow-medium hover:shadow-strong hover:-translate-y-0.5'
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

          <div className="p-6 bg-gradient-to-br from-accent-cream to-white rounded-2xl border-2 border-neutral-200 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-terracotta to-accent-gold rounded-xl flex items-center justify-center shadow-soft">
                <MapPin size={24} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="text-lg font-bold text-neutral-900">
                  {userLocation.city}
                </div>
                {userLocation.neighborhood && (
                  <div className="text-sm text-neutral-600 font-medium mt-0.5">
                    {userLocation.neighborhood}
                  </div>
                )}
              </div>
            </div>
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
            className="px-8 py-4 bg-gradient-to-r from-accent-terracotta/10 to-accent-terracotta/5 text-accent-terracotta rounded-2xl font-bold hover:from-accent-terracotta/20 hover:to-accent-terracotta/10 transition-all duration-300 border-2 border-accent-terracotta/20 hover:border-accent-terracotta/40 hover:shadow-soft"
          >
            Clear All Data
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
