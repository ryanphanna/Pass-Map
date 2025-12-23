import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-accent-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold to-accent-sage mx-auto mb-6 flex items-center justify-center animate-pulse">
          <Loader2 className="text-white animate-spin" size={32} strokeWidth={2.5} />
        </div>
        <p className="text-body text-neutral-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
