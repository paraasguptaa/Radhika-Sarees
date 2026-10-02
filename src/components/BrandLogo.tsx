import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-stone-900',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-18 h-18',
    xl: 'w-24 h-24',
    '2xl': 'w-36 h-36',
  };

  const currentSizeClass = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Exact Circular Brand Emblem matching user's uploaded logo */}
      <div
        className={`${currentSizeClass} shrink-0 rounded-full transition-transform duration-300 hover:scale-105 drop-shadow-md`}
        title="Radhika Sarees (राधिका साड़ीज)"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full rounded-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Red Badge */}
          <circle cx="500" cy="500" r="495" fill="#E31E24" />

          {/* Top Line: राधिका */}
          <text
            x="500"
            y="445"
            fill="#FFFFFF"
            fontFamily="'Rozha One', 'Noto Serif Devanagari', 'Yatra One', 'Mukta', 'Devanagari MT', serif"
            fontSize="215"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="-1"
          >
            राधिका
          </text>

          {/* Bottom Line: साड़ीज */}
          <text
            x="500"
            y="720"
            fill="#FFFFFF"
            fontFamily="'Rozha One', 'Noto Serif Devanagari', 'Yatra One', 'Mukta', 'Devanagari MT', serif"
            fontSize="195"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="1"
          >
            साड़ीज
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif tracking-wider font-extrabold uppercase text-lg sm:text-xl ${textColor} font-['Playfair_Display',serif]`}
            >
              RADHIKA
            </span>
            <span className="font-serif tracking-widest font-bold text-xs sm:text-sm text-[#E31E24] uppercase">
              SAREES
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10.5px] text-stone-500 font-semibold tracking-wider">
            <span className="text-[#E31E24] font-bold">Tel Gali, Atarra</span>
            <span>•</span>
            <span>PIN 210201 (UP)</span>
          </div>
        </div>
      )}
    </div>
  );
};
