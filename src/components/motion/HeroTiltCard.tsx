import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface HeroTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number; // default 8deg
  perspective?: number; // default 900px
}

export const HeroTiltCard = ({
  children,
  className = '',
  maxTiltDeg = 8,
  perspective = 900,
}: HeroTiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX; // -1 to 1
    const normalizedY = (y - centerY) / centerY; // -1 to 1

    // Clamp angle to ±maxTiltDeg
    const rotX = Math.max(Math.min(-normalizedY * maxTiltDeg, maxTiltDeg), -maxTiltDeg);
    const rotY = Math.max(Math.min(normalizedX * maxTiltDeg, maxTiltDeg), -maxTiltDeg);

    setTilt({ rotateX: rotX, rotateY: rotY });
    setSpotlight({ x, y, opacity: 1 });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setIsHovering(false);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="relative w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden ${className}`}
        style={{
          transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovering
            ? 'transform 0.08s ease-out'
            : 'transform 0.4s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Radial Purple Spotlight overlay (rgba(155, 140, 240, 0.35)) */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(155, 140, 240, 0.35), transparent 80%)`,
          }}
        />

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
