import Image from 'next/image';
import CoffeGif from '../../../assets/gifs/coffe.webp';

const Achievements = () => (
  <div className="text-fluid-2xl flex w-full flex-col gap-8">
    <p>
      Along the way, I&apos;ve had the chance to contribute to meaningful
      projects and grow through experiences I&apos;m truly proud of:
    </p>
    <ul className="space-y-8">
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt=""
          width={32}
          height={32}
          className="rounded-full bg-white p-1"
        />
        <p>
          Working for an American company for 3+ years on a product that reaches
          around{' '}
          <span className="font-bold text-blue-300">
            70% of Americans every week
          </span>
          .
        </p>
      </li>
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt=""
          width={32}
          height={32}
          className="rounded-full bg-white p-1"
        />
        <p>
          Building scalable solutions, including{' '}
          <span className="font-bold text-blue-300">
            100+ reusable components
          </span>
          , <span className="font-bold text-blue-300">80+ test suites</span>,
          <span className="font-bold text-blue-300"> 30+ API modules</span>, and{' '}
          <span className="font-bold text-blue-300">20+ core features</span>.
        </p>
      </li>
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt=""
          width={32}
          height={32}
          className="rounded-full bg-white p-1"
        />
        <p>
          Collaborating with multicultural teams in remote and asynchronous
          environments.
        </p>
      </li>
    </ul>
  </div>
);

export default Achievements;
