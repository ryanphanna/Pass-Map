import { ArrowRight, Gift } from 'lucide-react';
import { getInstitutionById } from '../data/sampleData';

const ReciprocalCard = ({ reciprocal }) => {
  const fromInstitution = getInstitutionById(reciprocal.fromInstitutionId);
  const toInstitution = getInstitutionById(reciprocal.toInstitutionId);

  return (
    <div className="col-span-1 md:col-span-2 h-[240px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full mb-4">
            <Gift size={16} className="text-white" />
            <span className="text-xs font-semibold text-white">
              Member Benefit
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {reciprocal.benefit}
          </h3>
          <p className="text-white/90 text-sm mb-4">
            {reciprocal.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-xs text-white/80">
              <div className="font-semibold">{fromInstitution?.shortName}</div>
              <div className="capitalize">{reciprocal.membershipTier}</div>
            </div>

            <ArrowRight size={20} className="text-white/60" />

            <div className="text-xs text-white/80">
              <div className="font-semibold">{toInstitution?.shortName}</div>
            </div>
          </div>

          <div className="text-white/60 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReciprocalCard;
