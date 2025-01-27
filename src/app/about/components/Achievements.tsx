import Image from 'next/image';
import CoffeGif from '../../../assets/gifs/coffe.gif';

const Achievements = () => (
  <div className="flex w-full flex-col gap-8 text-fluid-2xl">
    <p>During this years, I&apos;m proud of:</p>
    <ul className="space-y-8">
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt="Coffee animation"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p>
          Work for an American company for over two years in a product that
          generates media impact on about{' '}
          <span className="font-bold text-blue-300">
            70% of Americans weekly
          </span>
          .
        </p>
      </li>
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt="Coffee animation"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p>
          Creating scalable solutions, I&apos;ve built{' '}
          <span className="font-bold text-blue-300">
            100+ reusable components
          </span>
          , <span className="font-bold text-blue-300">50+, test suites</span>,
          and <span className="font-bold text-blue-300">20+ core features</span>
          .
        </p>
      </li>
      <li className="flex items-center gap-4">
        <Image
          src={CoffeGif}
          alt="Coffee animation"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p>
          Working with a multicultural team in a remote and asynchronous
          environment.
        </p>
      </li>
    </ul>
  </div>
);

export default Achievements;
