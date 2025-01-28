'use client';

import { motion } from 'framer-motion';

const WellcomeContainer = () => {
  return (
    <motion.div
      className="flex flex-col justify-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-4 text-fluid-2xl">
        Hey there{''}
        <motion.span
          className="ml-2 mr-1 inline-block"
          animate={{
            rotate: [0, 15, -15, 10, -10, 0],
            x: [0, 2, -2, 2, -2, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          👋🏾
        </motion.span>{' '}
        , my name is
      </p>
      <h1 className="text-fluid-8xl">Eric Junqueira.</h1>
      <h1 className="text-fluid-6xl">
        I work with{' '}
        <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          ideas
        </span>{' '}
        in the{' '}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
          Web
        </span>
        .
      </h1>
    </motion.div>
  );
};

export default WellcomeContainer;
