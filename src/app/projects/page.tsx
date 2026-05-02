import ProjectsCarousel from './components/ProjectsCarousel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects by Eric Junqueira — web apps, experiments, and open source work.',
};

export default function Projects() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-x-hidden px-6 py-6 sm:px-8 md:px-10 md:py-10">
      <div className="flex min-h-0 w-full max-w-4xl flex-col items-center">
        <h1 className="text-fluid-2xl text-center">
          Some of my{' '}
          <span className="bg-linear-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            Projects
          </span>
          :
        </h1>
        <ProjectsCarousel />
      </div>
    </div>
  );
}
