import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import { getInstitutionById } from '../data/sampleData';

const ReciprocalCard = ({ reciprocal, style }) => {
  const fromInstitution = getInstitutionById(reciprocal.fromInstitutionId);
  const toInstitution = getInstitutionById(reciprocal.toInstitutionId);

  return (
    <div style={style} className="h-full relative overflow-hidden rounded-3xl shadow-medium hover:shadow-editorial transition-magazine cursor-pointer group hover-elevate">
      {/* Sophisticated gradient background with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold via-primary-600 to-accent-sage opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 blur-2xl" />

      <div className="relative p-7 sm:p-8 h-full flex flex-col justify-between">
        <div>
          {/* Badge - refined design */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-editorial rounded-full mb-5 shadow-soft">
            <Sparkles size={16} strokeWidth={2.5} className="text-white" />
            <span className="text-overline text-white">
              Member Benefit
            </span>
          </div>

          {/* Title - magazine typography */}
          <h3 className="text-title sm:text-title-lg font-bold text-white mb-3 text-shadow-editorial leading-tight-magazine">
            {reciprocal.benefit}
          </h3>
          <p className="text-body text-white/90 mb-5 leading-magazine line-clamp-2 text-shadow-soft">
            {reciprocal.description}
          </p>
        </div>

        {/* Connection flow - elegant design */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* From institution */}
            <div className="group/from">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-soft rounded-xl border border-white/30 transition-magazine group-hover/from:bg-white/30">
                <div className="text-caption text-white font-semibold">
                  {fromInstitution?.shortName}
                </div>
              </div>
              <div className="text-xs text-white/70 mt-1.5 px-1 capitalize font-medium">
                {reciprocal.membershipTier} member
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-px bg-white/40" />
              <ArrowRight size={20} strokeWidth={2.5} className="text-white/80" />
              <div className="w-8 h-px bg-white/40" />
            </div>

            {/* To institution */}
            <div className="px-4 py-2.5 bg-white/20 backdrop-soft rounded-xl border border-white/30">
              <div className="text-caption text-white font-semibold">
                {toInstitution?.shortName}
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-soft flex items-center justify-center border border-white/30 transition-magazine group-hover:bg-white/30 group-hover:scale-110">
            <ArrowRight size={20} strokeWidth={2.5} className="text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReciprocalCard;
