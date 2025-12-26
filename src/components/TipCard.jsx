import { Sparkles, Heart, MapPin, Gift, Lightbulb } from 'lucide-react';

const TipCard = ({ tip, size = 'medium', style }) => {
  // Size classes for bento grid
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
    custom: '' // For grid positioning
  };

  const heightClasses = {
    small: 'h-[400px] sm:h-[450px]',
    medium: 'h-[500px] sm:h-[550px]',
    large: 'h-[600px]',
    custom: 'h-full' // Fill grid cell
  };

  // Different visual styles for variety - MORE CONTRAST
  const getStyleByType = () => {
    switch (tip.type) {
      case 'membership':
        return {
          gradient: 'from-accent-gold via-accent-gold/60 to-accent-gold/40',
          icon: Gift,
          iconColor: 'text-white',
          textColor: 'text-white',
          accentColor: 'white'
        };
      case 'insider':
        return {
          gradient: 'from-accent-terracotta via-accent-terracotta/70 to-accent-terracotta/50',
          icon: Lightbulb,
          iconColor: 'text-white',
          textColor: 'text-white',
          accentColor: 'white'
        };
      case 'neighborhood':
        return {
          gradient: 'from-accent-slate via-accent-slate/70 to-accent-slate/50',
          icon: MapPin,
          iconColor: 'text-white',
          textColor: 'text-white',
          accentColor: 'white'
        };
      case 'favorite':
        return {
          gradient: 'from-accent-sage via-accent-sage/70 to-accent-sage/50',
          icon: Heart,
          iconColor: 'text-white',
          textColor: 'text-white',
          accentColor: 'white'
        };
      default:
        return {
          gradient: 'from-neutral-900 via-neutral-800 to-neutral-700',
          icon: Sparkles,
          iconColor: 'text-accent-gold',
          textColor: 'text-white',
          accentColor: 'accent-gold'
        };
    }
  };

  const visualStyle = getStyleByType();
  const Icon = visualStyle.icon;

  return (
    <div
      style={style}
      className={`
        ${sizeClasses[size]}
        ${heightClasses[size]}
        relative overflow-hidden
        rounded-3xl shadow-medium hover:shadow-editorial
        transition-magazine cursor-default hover-elevate
        bg-gradient-to-br ${visualStyle.gradient}
      `}
    >
      {/* Decorative elements - MORE SUBTLE */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-3xl" />

      <div className="relative h-full p-8 sm:p-10 flex flex-col justify-between">
        <div>
          {/* Icon badge - MUCH bigger and bolder */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-editorial shadow-soft mb-6">
            <Icon size={32} strokeWidth={2.5} className={visualStyle.iconColor} />
          </div>

          {/* Tip content - MASSIVE editorial typography */}
          <h3 className={`
            font-black ${visualStyle.textColor} mb-4 leading-tight tracking-tight break-words
            ${size === 'large' ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : size === 'medium' ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-lg sm:text-xl md:text-2xl'}
          `}>
            {tip.title}
          </h3>

          {tip.description && (
            <p className={`
              ${visualStyle.textColor} opacity-90 leading-relaxed font-medium break-words
              ${size === 'large' ? 'text-base sm:text-lg md:text-xl' : size === 'medium' ? 'text-sm sm:text-base md:text-lg' : 'text-sm sm:text-base'}
              ${size === 'small' ? 'line-clamp-3' : size === 'medium' ? 'line-clamp-4' : 'line-clamp-5'}
            `}>
              {tip.description}
            </p>
          )}
        </div>

        {/* Optional label/badge at bottom */}
        {tip.label && (
          <div className="flex items-center gap-2.5 mt-6">
            <div className={`w-1.5 h-1.5 rounded-full bg-${visualStyle.accentColor}`} />
            <span className={`text-sm ${visualStyle.textColor} opacity-80 font-bold uppercase tracking-widest`}>
              {tip.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipCard;
