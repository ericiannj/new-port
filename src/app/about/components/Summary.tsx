import Tooltip from '@/components/Tooltip';

const Summary = () => (
  <div className="flex h-full w-full flex-col gap-2 md:h-[215px]">
    <p className="text-fluid-2xl">
      - Full Stack Developer with strong{' '}
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        Front-End focus
      </span>
      .
    </p>
    <p className="text-fluid-2xl">
      -{' '}
      <span className="relative">
        <span className="relative z-10">4+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      years of work experience.
    </p>
    <p className="text-fluid-2xl">
      - Creating scalable solutions, I&apos;ve built
      <span className="relative ml-1">
        <span className="relative z-10">100+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      reusable components,
      <span className="relative ml-1">
        <span className="relative z-10">50+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      test suites, and
      <span className="relative ml-1">
        <span className="relative z-10">20+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      core features.
    </p>
    <p className="text-fluid-2xl">
      - Worked in applications in{' '}
      <Tooltip className="-left-12" id="education">
        education
      </Tooltip>
      , <Tooltip id="social networks">social networks</Tooltip> and{' '}
      <Tooltip id="location-based software">location-based software</Tooltip>.
    </p>
  </div>
);

export default Summary;
