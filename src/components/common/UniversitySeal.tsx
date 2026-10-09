import React from 'react';

interface UniversitySealProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  monochrome?: boolean;
  className?: string;
}

export const USINDH_SEAL_URL = '/src/assets/images/usindh_official_seal_1791544155372.jpg';
export const USINDH_STATUE_HERO_URL = '/src/assets/images/usindh_statue_hero_1791544134127.jpg';

export const UniversitySeal: React.FC<UniversitySealProps> = ({
  size = 'md',
  showText = false,
  monochrome = false,
  className = ''
}) => {
  const dimensionMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Circular University of Sindh Seal */}
      <div className={`relative ${dimensionMap[size]} shrink-0 select-none group`}>
        <div className={`w-full h-full rounded-full overflow-hidden p-0.5 ${
          monochrome 
            ? 'bg-slate-300 border border-slate-400/40 grayscale opacity-90' 
            : 'bg-gradient-to-br from-amber-300 via-slate-200 to-amber-400 shadow-sm border border-amber-400/40'
        } transition-transform duration-300 group-hover:scale-105`}>
          <img
            src={USINDH_SEAL_URL}
            alt="University of Sindh Official Seal"
            className={`w-full h-full object-contain rounded-full bg-white ${monochrome ? 'grayscale' : ''}`}
            loading="eager"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-[#0a2342] text-sm sm:text-base leading-none">
              UNIVERSITY OF SINDH
            </span>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold">
              ESTD 1947
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
            Allama II Qazi Campus, Jamshoro · Central LMS
          </span>
        </div>
      )}
    </div>
  );
};
