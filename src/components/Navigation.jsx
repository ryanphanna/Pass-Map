import { Compass, Bookmark, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation = ({ currentView, setCurrentView }) => {
  const { userLocation } = useApp();
  
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-neutral-200 z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - sophisticated typography */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-accent-gold to-accent-sage rounded-full" />
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Culture {userLocation.city || 'Discovery'}
            </h1>
          </div>

          {/* Navigation items - refined design */}
          <div className="flex gap-2">
            {/* eslint-disable-next-line no-unused-vars */}
            {navItems.map(({ id, label, icon: IconComponent }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`
                  group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-magazine
                  ${currentView === id
                    ? 'bg-neutral-900 text-white shadow-soft'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }
                `}
              >
                <IconComponent
                  size={20}
                  strokeWidth={currentView === id ? 2.5 : 2}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="hidden sm:inline text-caption font-semibold tracking-wide">
                  {label}
                </span>

                {/* Subtle active indicator */}
                {currentView === id && (
                  <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-accent-gold rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
