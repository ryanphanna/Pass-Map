const SkeletonCard = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
    wide: 'col-span-full'
  };

  const heightClasses = {
    small: 'h-[320px] sm:h-[380px]',
    medium: 'h-[420px] sm:h-[480px]',
    large: 'h-[500px] sm:h-[580px] md:h-[650px]',
    wide: 'h-[400px] sm:h-[450px]'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${heightClasses[size]}
        relative overflow-hidden rounded-2xl bg-neutral-200 animate-pulse
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200" />
      
      {/* Content placeholder at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-neutral-300 rounded-full w-3/4" />
        <div className="h-6 bg-neutral-300 rounded-full w-1/2" />
        
        {/* Description skeleton (for larger cards) */}
        {(size === 'large' || size === 'wide' || size === 'medium') && (
          <>
            <div className="h-4 bg-neutral-300 rounded-full w-full mt-4" />
            <div className="h-4 bg-neutral-300 rounded-full w-4/5" />
          </>
        )}
        
        {/* Metadata skeleton */}
        <div className="flex gap-2 mt-4">
          <div className="h-7 w-20 bg-neutral-300 rounded-full" />
          <div className="h-7 w-24 bg-neutral-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
