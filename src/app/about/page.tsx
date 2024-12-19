'use client';

import Image from 'next/image';

import ProfileImage from '../../assets/images/profile.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  AnimatedSentences,
  Perspectives,
  Recommendations,
  Stack,
  Summary,
} from './components';
import { Icons } from '@/icons';

type Direction = 'next' | 'prev';

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const components = [
    { id: 'summary', Component: Summary },
    { id: 'perspectives', Component: Perspectives },
    { id: 'recommendations', Component: Recommendations },
    { id: 'stack', Component: Stack },
    // Add more components here as needed
  ];

  const nextComponent = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousComponent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideVariants = {
    initial: (direction: Direction) => ({
      x: direction === 'next' ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction: Direction) => ({
      x: direction === 'next' ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const direction = currentIndex > 0 ? 'next' : 'prev';
  const CurrentComponent = components[currentIndex].Component;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <AnimatedSentences />
      <div className="flex w-full flex-grow items-center justify-center">
        <div className="m-8 flex min-h-[400px] w-[80%] flex-col items-center rounded-md border-2 border-slate-200 p-4 md:flex-row md:space-x-8">
          <div className="mb-8 flex flex-col items-center gap-4 md:gap-16">
            <div className="h-64 min-w-64 overflow-hidden rounded-full">
              <Image
                alt="profile image"
                src={ProfileImage}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <p>More info available on </p>
              <motion.a
                href="https://www.linkedin.com/in/eric-junqueira/"
                animate={{
                  y: [0, -10, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{
                  display: 'inline-block',
                }}
              >
                <Icons.linkedin size={16} className="inline" />
              </motion.a>
            </div>
          </div>
          <div className="mx-auto w-full">
            <h1 className="mb-4 text-fluid-4xl">Eric Junqueira</h1>
            <div className="flex flex-col gap-8 text-justify">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={components[currentIndex].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CurrentComponent />
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex justify-between">
                <motion.button
                  onClick={previousComponent}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 ${
                    currentIndex === 0
                      ? 'cursor-not-allowed opacity-50'
                      : 'opacity-100'
                  } rounded bg-blue-400 hover:bg-blue-300`}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icons.arrowLeft size={16} />
                </motion.button>
                <motion.button
                  onClick={nextComponent}
                  disabled={currentIndex === components.length - 1}
                  className={`px-4 py-2 ${
                    currentIndex === components.length - 1
                      ? 'cursor-not-allowed opacity-50'
                      : 'opacity-100'
                  } rounded bg-blue-400 hover:bg-blue-300`}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icons.arrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
