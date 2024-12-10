'use client';

import Image from 'next/image';
import AnimatedSentences from './components/AnimatedSentences';

import ProfileImage from '../../assets/images/profile.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Direction = 'next' | 'prev';

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const components = [
    { id: 'summary', Component: Summary },
    { id: 'perspectives', Component: Perspectives },
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
        <div className="m-8 flex min-h-[400px] w-[80%] items-center space-x-8 rounded-md border-2 border-slate-200 p-4">
          <div className="h-64 min-w-64 overflow-hidden rounded-full">
            <Image
              alt="profile image"
              src={ProfileImage}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="mb-4 text-4xl">Eric Junqueira</h1>
            <div className="flex flex-col gap-8">
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
                <button
                  onClick={previousComponent}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 ${
                    currentIndex === 0
                      ? 'cursor-not-allowed opacity-50'
                      : 'opacity-100'
                  } rounded bg-gray-300`}
                >
                  Back
                </button>
                <button
                  onClick={nextComponent}
                  disabled={currentIndex === components.length - 1}
                  className={`px-4 py-2 ${
                    currentIndex === components.length - 1
                      ? 'cursor-not-allowed opacity-50'
                      : 'opacity-100'
                  } rounded bg-gray-300`}
                >
                  Ahead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Summary = () => (
  <div className="flex h-full w-full flex-col gap-2 bg-orange-300">
    <p className="text-2xl">
      - Full Stack Developer with strong{' '}
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        Front-End focus
      </span>
      .
    </p>
    <p className="text-2xl">
      -{' '}
      <span className="relative">
        <span className="relative z-10">4+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      years of work experience.
    </p>
    <p className="text-2xl">
      - Creating scalable solutions, I&apos;ve built
      <span className="relative ml-1">
        <span className="relative z-10">100+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      reusable components,
      <span className="relative ml-1">
        <span className="relative z-10">50+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      test suites, and
      <span className="relative ml-1">
        <span className="relative z-10">20+</span>
        <span className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500"></span>
      </span>{' '}
      core features.
    </p>
    <p className="text-2xl">
      - Worked in applications in education, social networks, and location-based
      software.
    </p>
  </div>
);

const Perspectives = () => (
  <div className="flex h-[215px] w-full flex-col gap-8 bg-blue-400">
    <p className="text-2xl">
      I am committed to continually expanding skills, mainly with my current
      main stack (React JS/Next.js/Typescript) + knowledge of User Experience,
      Front-end architecture and human-machine interaction.
    </p>
    <p className="text-2xl">
      Complementary areas: Mobile + Web3 + Use of AI tools.
    </p>
  </div>
);
