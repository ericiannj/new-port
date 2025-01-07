import ProjectsCarousel from './components/ProjectsCarousel';

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-grow flex-col items-center justify-center">
      <div className="flex min-h-[500px] w-[80%] flex-col items-center">
        <h1 className="text-fluid-2xl">
          Some of my{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            Projects
          </span>
          :
        </h1>
        <ProjectsCarousel />
      </div>
    </div>
  );
}
