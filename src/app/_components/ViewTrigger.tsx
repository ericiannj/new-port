'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ViewTriggerProps {
  children: ReactNode;
  className?: string;
  animationClass?: string;
}

export function ViewTrigger({
  children,
  className = '',
  animationClass = 'animate-fade-in-up',
}: ViewTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}
