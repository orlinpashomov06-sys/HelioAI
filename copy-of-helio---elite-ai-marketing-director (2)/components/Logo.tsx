import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="helio-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* Purple-500 */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background Shape (Soft Rounded Square) */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#helio-gradient)" fillOpacity="0.2" />
        <rect x="2" y="2" width="36" height="36" rx="10" stroke="url(#helio-gradient)" strokeWidth="1.5" />

        {/* The "H" formed by pillars and a spark */}
        {/* Left Pillar */}
        <path d="M13 10 V30" stroke="url(#helio-gradient)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Right Pillar */}
        <path d="M27 10 V30" stroke="url(#helio-gradient)" strokeWidth="3" strokeLinecap="round" />
        
        {/* The Spark/Bridge (AI Intelligence) */}
        <path 
          d="M13 20 L17 20 L20 17 L23 20 L27 20" 
          stroke="#e2e8f0" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        
        {/* Central Star Point */}
        <circle cx="20" cy="20" r="2" fill="white" filter="url(#glow)" />
      </svg>
    </div>
  );
};