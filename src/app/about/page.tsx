import {
  Perspectives,
  Recommendations,
  Stack,
  Summary,
  AboutSection,
  Achievements,
  SectionTracker,
} from './components';

const sections = [
  { id: 'summary', bgColor: '#0a0a0a', component: Summary },
  { id: 'achievements', bgColor: 'bg-achievements', component: Achievements },
  { id: 'stack', bgColor: 'bg-stack', component: Stack },
  {
    id: 'recommendations',
    bgColor: 'bg-slate-700',
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
