import {
  Perspectives,
  Recommendations,
  Stack,
  Summary,
  AboutSection,
  Achievements,
  SectionTracker,
} from './components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Eric Junqueira — a full stack developer with a front-end focus. Over 5 years of experience across Location Software, Education, and more.',
};

const sections = [
  { id: 'summary', bgColor: '#0a0a0a', component: Summary },
  { id: 'achievements', bgColor: 'bg-achievements', component: Achievements },
  { id: 'stack', bgColor: 'bg-stack', component: Stack },
  {
    id: 'recommendations',
    bgColor: 'bg-recommendations',
    component: Recommendations,
  },
  { id: 'perspectives', bgColor: '#0a0a0a', component: Perspectives },
] as const;

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <SectionTracker>
        {sections.map((section) => {
          const Component = section.component;
          return (
            <AboutSection
              key={section.id}
              id={section.id}
              bgColor={section.bgColor}
            >
              <Component />
            </AboutSection>
          );
        })}
      </SectionTracker>
    </div>
  );
}
