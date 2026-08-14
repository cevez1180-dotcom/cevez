import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  maxDistance?: number; // max translation in px (8px as requested)
  proximityThreshold?: number; // 40px as requested
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  id?: string;
}

export const MagneticButton = ({
  children,
  className = '',
  maxDistance = 8,
  proximityThreshold = 40,
  onClick,
  id,
}: MagneticButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.hypot(deltaX, deltaY);
    const maxRadius = Math.max(rect.width, rect.height) / 2 + proximityThreshold;

    if (distance < maxRadius) {
      const pull = Math.min(distance / maxRadius, 1);
      const moveX = (deltaX / distance) * (maxDistance * pull);
      const moveY = (deltaY / distance) * (maxDistance * pull);
      setPosition({ x: moveX, y: moveY });
      setIsHovered(true);
    } else {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block relative transition-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
