'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/icons';
import { useState } from 'react';

const Recommendations = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const comments = [
    { id: 0, component: Recommendation1 },
    { id: 1, component: Recommendation2 },
    { id: 2, component: Recommendation3 },
  ];
  const CurrentComponent = comments[selectedIndex].component;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col items-center">
        <div className="min-h-[360px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-4">
          {Array.from({ length: comments.length }, (_, index) => (
            <motion.button
              key={index}
              className={`rounded p-1 ${
                selectedIndex === index ? 'bg-blue-300' : 'bg-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={
                selectedIndex === index
                  ? {
                      opacity: [1, 0.5, 1],
                    }
                  : {}
              }
              transition={
                selectedIndex === index
                  ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
                  : {}
              }
            >
              <Icons.about />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Recommendation1 = () => (
  <div className="flex w-full flex-col gap-2 text-fluid-xl">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      &quot;I had the great opportunity to work with Eric at Grupo Portfolio,
      and it was incredible to see his progress in software development
      projects. In terms of both technical skills and behavior, Eric has always
      been a committed and studious professional who always strives for high
      quality in everything he does (in all his deliveries).
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      At the time, a notable case was a complex project we carried out, which
      aimed to build a new architecture and restructure an application to enable
      the implementation of new methods, services, libraries, and components
      (including updating frameworks). His work was fundamental to the success
      of the project, which he was able to apply and develop in Front-end,
      Back-end, and DevOps concepts.&quot;
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Thiago S.
    </motion.p>
  </div>
);

const Recommendation2 = () => (
  <div className="flex w-full flex-col gap-2 text-fluid-xl">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      &quot;Eric was a developer on my squad at Big Brain and from the beginning
      he demonstrated excellent communication, concern for the product and the
      quality of his work.
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Eric was a developer on my squad at Big Brain and from the beginning he
      demonstrated excellent communication, concern for the product and the
      quality of his work.&quot;
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Heloísa G.
    </motion.p>
  </div>
);

const Recommendation3 = () => (
  <div className="flex w-full flex-col gap-2 text-fluid-xl">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      &quot;Eric was one of my first colleagues when I started working in
      software development. What caught my attention the most about his way of
      working and planning was his search for the best technologies and
      methodologies on the market and his focus on creating scalable
      applications that could always evolve.
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      During the time I worked with him, I learned a lot and we evolved as
      professionals, pushing each other to achieve excellence in projects. He is
      a highly skilled professional. Few people have the courage to create an
      application from scratch at the beginning of their career, but he accepted
      this challenge together with our team without hesitation.&quot;
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-fluid-base"
    >
      Gabriel A.
    </motion.p>
  </div>
);

export default Recommendations;
