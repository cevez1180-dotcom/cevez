import { useEffect, useState, ReactNode } from 'react';

interface WordItem {
  text: string;
  isGradient?: boolean;
  isLineBreak?: boolean;
  customNode?: ReactNode;
}

interface WordRevealProps {
  words: WordItem[];
  staggerMs?: number; // default ~60ms
  durationMs?: number; // default 800ms
  delayMs?: number; // initial delay
  className?: string;
}

export const WordReveal = ({
  words,
  staggerMs = 60,
  durationMs = 800,
  delayMs = 100,
  className = '',
}: WordRevealProps) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((item, index) => {
        if (item.isLineBreak) {
          return <br key={`br-${index}`} className="hidden sm:inline" />;
        }

        const wordDelay = index * staggerMs;

        return (
          <span
            key={`word-${index}-${item.text}`}
            className="inline-block overflow-hidden align-top ml-2.5 pb-1 -mb-1"
          >
            <span
              className={`inline-block transform transition-transform will-change-transform ${
                item.isGradient
                  ? 'text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]'
                  : 'text-white'
              }`}
              style={{
                transform: revealed ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 115%, 0)',
                transitionDuration: `${durationMs}ms`,
                transitionDelay: `${wordDelay}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {item.customNode ? item.customNode : item.text}
            </span>
          </span>
        );
      })}
    </span>
  );
};
