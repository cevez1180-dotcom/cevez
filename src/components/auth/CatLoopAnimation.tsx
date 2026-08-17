import React from 'react';

interface CatLoopAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CatLoopAnimation: React.FC<CatLoopAnimationProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  // Font sizes for em-based scaling
  const fontSizeClass = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[11px] sm:text-[13px]',
    lg: 'text-[13px] sm:text-[15px]',
  }[size];

  const totalSegments = 30;
  const angleSpan = 40; // degrees
  const dur = 2; // seconds
  const delayInc = dur / 100; // 0.02s
  const angleInc = angleSpan / totalSegments;
  const negAngleHalf = -angleSpan / 2;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient glowing spotlight behind the cat */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-pink-500/10 rounded-full blur-2xl pointer-events-none scale-125 animate-pulse" />

      {/* Cat Animation Container */}
      <div className={`cat-container ${fontSizeClass} relative w-[16em] h-[16em]`}>
        <div className="cat">
          {Array.from({ length: totalSegments }).map((_, index) => {
            const rotateDeg = negAngleHalf + angleInc * index;
            const animDelay = delayInc * index;

            return (
              <div
                key={index}
                className="cat__segment"
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotateDeg}deg)`,
                  // @ts-ignore custom CSS prop
                  '--anim-delay': `${animDelay}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
