import TargetGif from '../../../assets/gifs/target.webp';
import ResumeGif from '../../../assets/gifs/resume.webp';
import Image from 'next/image';

const Perspectives = () => (
  <div className="flex w-full flex-col gap-8">
    <div className="text-fluid-2xl flex flex-col space-y-6">
      <div className="flex items-center gap-4">
        <Image
          alt=""
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          Today, most of my work is centered on front-end engineering, which
          represents over 70% of my day-to-day.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt=""
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          At the same time, I continue to grow as a full-stack developer,
          deepening my backend experience with Node.js, especially using NestJS
          and Express.js.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt=""
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          More recently, I&apos;ve also been contributing to AI-powered
          products, helping build experiences that make the use of AI more
          reliable, transparent, and practical.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt=""
          width={32}
          height={32}
          src={TargetGif}
          className="rounded-full bg-white p-1"
        />
        <p>
          I enjoy creating products that balance usability, scalability, and
          thoughtful engineering.
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
          alt=""
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
