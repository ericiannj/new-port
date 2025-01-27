'use client';

import { Perspectives, Recommendations, Stack, Summary } from './components';
import { useEffect, useState } from 'react';
import NavigationDots from './components/NavigationDots';
import AboutSection from './components/AboutSection';
import Achievements from './components/Achievements';

const sections = [
  {
    id: 'summary',
    bgColor: '#0a0a0a',
  },
  {
    id: 'achievements',
    bgColor: 'bg-slate-700',
  },
  {
    id: 'stack',
    bgColor: 'bg-slate-600',
  },
  {
    id: 'recommendations',
    bgColor: 'bg-slate-700',
  },
  {
    id: 'perspectives',
    bgColor: '#0a0a0a',
  },
] as const;

type Section = (typeof sections)[number];

export default function About() {
  const [activeSection, setActiveSection] = useState<Section['id']>('summary');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const mostVisible = entries.reduce((prev, current) => {
          return (prev?.intersectionRatio ?? 0) > current.intersectionRatio
            ? prev
            : current;
        });

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveSection(mostVisible.target.id as Section['id']);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for smoother detection
        rootMargin: '-45% 0px -45% 0px', // Adjust the detection area to be center-focused
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const renderSection = (id: Section['id']) => {
    switch (id) {
      case 'achievements':
        return <Achievements />;
      case 'stack':
        return <Stack />;
      case 'recommendations':
        return <Recommendations />;
      case 'perspectives':
        return <Perspectives />;
      default:
        return <Summary />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="relative w-full">
        <NavigationDots sections={sections} activeSection={activeSection} />
        {sections.map((section) => (
          <AboutSection
            key={section.id}
            id={section.id}
            bgColor={section.bgColor}
          >
            {renderSection(section.id)}
          </AboutSection>
        ))}
      </div>
    </div>
  );
}
