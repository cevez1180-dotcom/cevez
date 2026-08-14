import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  id?: string;
}

export const ScrollReveal = ({
  children,
  className = '',
  delayMs = 0,
  durationMs = 900,
  threshold = 0.12,
  id,
}: ScrollRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // If IntersectionObserver is not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      id={id}
      className={`scroll-reveal ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: 'var(--ease-expo-out)',
      }}
    >
      {children}
    </div>
  );
};
