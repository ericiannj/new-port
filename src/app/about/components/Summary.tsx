import DomainsSection from './DomainsSection';

import CustomProfileImage from './CustomProfileImage';
import { motion } from 'framer-motion';

const Summary = () => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col text-fluid-2xl"
  >
    <div className="mb-8 flex justify-center">
      <CustomProfileImage />
    </div>
    <p className="mb-2 indent-8">
      I&apos;m a Full Stack Developer with strong{' '}
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        Front-End focus
      </span>
      .
    </p>
    <p className="indent-8">
      For over{' '}
      <span className="relative">
        <span className="relative z-10">5</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500" />
      </span>{' '}
      years of work experience, I had the opportunity in projects of the
      domains:
    </p>
    <DomainsSection />
  </motion.div>
);

export default Summary;
