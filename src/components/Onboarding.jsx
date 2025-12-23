import { X, Sparkles, Settings as SettingsIcon, Heart, Gift } from 'lucide-react';

const Onboarding = ({ onClose, onGoToSettings }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div
        className="relative bg-accent-cream w-full max-w-2xl rounded-3xl shadow-editorial overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/95 hover:bg-white shadow-soft hover:shadow-medium transition-magazine z-10 backdrop-editorial"
          aria-label="Close"
        >
          <X size={20} strokeWidth={2.5} className="text-neutral-900" />
        </button>

        {/* Hero section with gradient */}
        <div className="relative bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white p-8 sm:p-12 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/20 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-sage/20 rounded-full translate-y-24 -translate-x-24 blur-3xl" />

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-sage mx-auto mb-6 flex items-center justify-center shadow-strong">
              <Sparkles className="text-white" size={32} strokeWidth={2.5} />
            </div>

            <h2 id="onboarding-title" className="text-headline md:text-display-sm font-black text-center mb-4 text-shadow-editorial leading-tight">
              Welcome to Your Cultural Guide
            </h2>

            <p className="text-body-lg text-white/85 text-center leading-magazine max-w-xl mx-auto">
              Discover curated cultural experiences, find free access opportunities, and never miss limited-time exhibits.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12">

          {/* The app works without setup */}
          <div className="mb-8 p-6 bg-gradient-to-br from-accent-sage/10 to-accent-sage/5 rounded-2xl border-2 border-accent-sage/20">
            <p className="text-body text-neutral-800 leading-magazine text-center">
              <span className="font-bold text-accent-sage">You're all set!</span> Browse curated exhibits, discover free access opportunities, and explore cultural experiences right now.
            </p>
          </div>

          {/* Personalization options */}
          <div className="mb-8">
            <h3 className="text-title font-bold text-neutral-900 mb-4 text-center">
              Get Even More Personalized
            </h3>
            <p className="text-body text-neutral-600 leading-magazine text-center mb-6">
              Unlock exclusive benefits and tailored recommendations:
            </p>

            <div className="space-y-4">
              {/* Interests */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-neutral-200 hover:border-accent-gold transition-all duration-300 hover:shadow-soft">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-terracotta to-accent-gold flex items-center justify-center shadow-soft">
                  <Heart size={24} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h4 className="text-body font-bold text-neutral-900 mb-1">
                    Select Your Interests
                  </h4>
                  <p className="text-caption text-neutral-600 leading-relaxed">
                    Tell us what you love - art, science, history, nature - and we'll show you exhibits that match your passions.
                  </p>
                </div>
              </div>

              {/* Memberships */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-neutral-200 hover:border-accent-gold transition-all duration-300 hover:shadow-soft">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-sage flex items-center justify-center shadow-soft">
                  <Gift size={24} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h4 className="text-body font-bold text-neutral-900 mb-1">
                    Add Your Memberships
                  </h4>
                  <p className="text-caption text-neutral-600 leading-relaxed">
                    Unlock exclusive reciprocal benefits - free admission, discounts, and special access at partner institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToSettings}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-magazine shadow-medium hover:shadow-strong text-body font-semibold"
            >
              <SettingsIcon size={20} strokeWidth={2.5} />
              <span>Set Up Preferences</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white text-neutral-700 rounded-full hover:bg-neutral-100 transition-magazine shadow-soft hover:shadow-medium text-body font-semibold border-2 border-neutral-200"
            >
              Start Exploring
            </button>
          </div>

          {/* Footer note */}
          <p className="text-caption text-neutral-500 text-center mt-6 leading-relaxed">
            You can always adjust preferences later in Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
