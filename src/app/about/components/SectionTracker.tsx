'use client';

import { useEffect, useState, type ReactNode } from 'react';
import NavigationDots from './NavigationDots';

const sections = [
  { id: 'summary' as const, bgColor: '#0a0a0a' },
  { id: 'achievements' as const, bgColor: 'bg-slate-700' },
  { id: 'stack' as const, bgColor: 'bg-slate-600' },
  { id: 'recommendations' as const, bgColor: 'bg-slate-700' },
  { id: 'perspectives' as const, bgColor: '#0a0a0a' },
];

type SectionId = (typeof sections)[number]['id'];

export default function SectionTracker({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('summary');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((prev, current) => {
          return (prev?.intersectionRatio ?? 0) > current.intersectionRatio
            ? prev
            : current;
        });

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveSection(mostVisible.target.id as SectionId);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-45% 0px -45% 0px',
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      <NavigationDots sections={sections} activeSection={activeSection} />
      {children}
    </div>
  );
}
