import { Icons } from '@/icons';

const Perspectives = () => (
  <div className="flex w-full flex-col gap-8">
    <div className="text-fluid-2xl">
      <p className="indent-8">
        Currently, I&apos;m primarily focused on front-end development, with
        over 70% of my work in this area.
      </p>
      <p className="indent-8">
        Alongside this, I&apos;m enhancing my back-end skills, especially with
        JavaScript technologies like Next.js and Express, and exploring the Go
        programming language.
      </p>
      <p className="indent-8">
        This helps me stay versatile and meet the changing needs of the tech
        industry.
      </p>
    </div>

    <div className="flex justify-center">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex transform items-center gap-2 rounded-lg p-3 text-slate-300 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:text-gray-900"
      >
        <Icons.resume className="h-6 w-6" />
        <span className="text-lg font-medium">My Resume</span>
      </a>
    </div>
  </div>
);

export default Perspectives;
