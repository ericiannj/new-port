'use client';

import { Perspectives, Recommendations, Stack, Summary } from './components';
import { useEffect, useState } from 'react';
import NavigationDots from './components/NavigationDots';
import AboutSection from './components/AboutSection';
import Achievements from './components/Achievements';

enum SectionId {
  Summary = 'summary',
  Achievements = 'achievements',
  Stack = 'stack',
  Recommendations = 'recommendations',
  Perspectives = 'perspectives',
}

export default function About() {
  const [activeSection, setActiveSection] = useState<SectionId>(
    SectionId.Summary,
  );

  const sections = Object.values(SectionId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const renderSection = (id: SectionId) => {
    switch (id) {
      case SectionId.Achievements:
        return <Achievements />;
      case SectionId.Stack:
        return <Stack />;
      case SectionId.Recommendations:
        return <Recommendations />;
      case SectionId.Perspectives:
        return <Perspectives />;
      default:
        return <Summary />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="relative">
        <NavigationDots sections={sections} activeSection={activeSection} />
        {sections.map((sectionId) => (
          <AboutSection key={sectionId} id={sectionId} bgColor="transparent">
            {renderSection(sectionId)}
          </AboutSection>
        ))}
      </div>
    </div>
  );
}
