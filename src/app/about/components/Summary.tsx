import Image from 'next/image';
import DomainsSection from './DomainsSection';

import ProfileImage from '../../../assets/images/profile.jpeg';

const Summary = () => (
  <div className="flex flex-col text-fluid-2xl">
    <div className="mb-8 flex justify-center">
      <Image
        src={ProfileImage}
        alt="Profile Image"
        height={90}
        width={90}
        className="rounded-full object-cover"
      />
    </div>
    <p className="mb-2 indent-8">
      I&apos;m a Full Stack Developer with strong{' '}
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        Front-End focus
      </span>
      .
    </p>
    <p className="mb-4 indent-8">
      For over{' '}
      <span className="relative">
        <span className="relative z-10">4+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500" />
      </span>{' '}
      years of work experience, I had the opportunity in projects of the
      domains:
    </p>
    <DomainsSection />
  </div>
);

export default Summary;
