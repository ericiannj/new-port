import TargetGif from '../../../assets/gifs/target.gif';
import ResumeGif from '../../../assets/gifs/resume.gif';
import Image from 'next/image';

const Perspectives = () => (
  <div className="flex w-full flex-col gap-8">
    <div className="flex flex-col space-y-6 text-fluid-2xl">
      <div className="flex items-center gap-4">
        <Image
          alt="target animation"
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          Currently, I&apos;m primarily focused on front-end development, with
          over 70% of my work in this area.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt="target animation"
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          Alongside this, I&apos;m enhancing my back-end skills, especially with
          JavaScript technologies like Next.js and Express, and exploring the Go
          programming language.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt="target animation"
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          This helps me stay versatile and meet the changing needs of the tech
          industry.
        </p>
      </div>
    </div>
    <div className="flex justify-center">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex transform items-center gap-2 rounded-lg p-3 text-slate-300 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:text-gray-900"
      >
        <Image
          alt="resume animation"
          width={32}
          height={32}
          src={ResumeGif}
          className="rounded-full bg-white p-1"
        />
        <span className="text-lg font-medium">My Resume</span>
      </a>
    </div>
  </div>
);

export default Perspectives;
