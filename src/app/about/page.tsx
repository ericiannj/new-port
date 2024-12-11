'use client';

import Image from 'next/image';
import AnimatedSentences from './components/AnimatedSentences';

import ProfileImage from '../../assets/images/profile.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Icons } from '@/icons';

type Direction = 'next' | 'prev';

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const components = [
    { id: 'summary', Component: Summary },
    { id: 'perspectives', Component: Perspectives },
    { id: 'recommendations', Component: Recommendations },
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
  <div className="flex h-full w-full flex-col gap-2">
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
  <div className="flex h-[215px] w-full flex-col gap-8">
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

const Recommendation1 = () => (
  <div className="flex h-[215px] w-full flex-col gap-2">
    <p className="text-base">
      &quot;I had the great opportunity to work with Eric at Grupo Portfolio,
      and it was incredible to see his progress in software development
      projects. In terms of both technical skills and behavior, Eric has always
      been a committed and studious professional who always strives for high
      quality in everything he does (in all his deliveries).
    </p>
    <p className="text-base">
      At the time, a notable case was a complex project we carried out, which
      aimed to build a new architecture and restructure an application to enable
      the implementation of new methods, services, libraries, and components
      (including updating frameworks). His work was fundamental to the success
      of the project, which he was able to apply and develop in Front-end,
      Back-end, and DevOps concepts.&quot;
    </p>
    <p className="text-base">Thiago S.</p>
  </div>
);

const Recommendation2 = () => (
  <div className="flex h-[215px] w-full flex-col gap-2">
    <p className="text-base">
      &quot;Eric was a developer on my squad at Big Brain and from the beginning
      he demonstrated excellent communication, concern for the product and the
      quality of his work.
    </p>
    <p className="text-base">
      Eric was a developer on my squad at Big Brain and from the beginning he
      demonstrated excellent communication, concern for the product and the
      quality of his work.&quot;
    </p>
    <p className="text-base">Heloísa G.</p>
  </div>
);

const Recommendation3 = () => (
  <div className="flex h-[215px] w-full flex-col gap-2">
    <p className="text-base">
      &quot;Eric was one of my first colleagues when I started working in
      software development. What caught my attention the most about his way of
      working and planning was his search for the best technologies and
      methodologies on the market and his focus on creating scalable
      applications that could always evolve.
    </p>
    <p className="text-base">
      During the time I worked with him, I learned a lot and we evolved as
      professionals, pushing each other to achieve excellence in projects. He is
      a highly skilled professional. Few people have the courage to create an
      application from scratch at the beginning of their career, but he accepted
      this challenge together with our team without hesitation.&quot;
    </p>
    <p className="text-base">Gabriel A.</p>
  </div>
);

const Recommendations = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const comments = [
    { id: 0, component: Recommendation1 },
    { id: 1, component: Recommendation2 },
    { id: 2, component: Recommendation3 },
  ];
  const CurrentComponent = comments[selectedIndex].component;

  return (
    <div className="flex h-[215px] w-full flex-col gap-2">
      <div className="flex flex-col items-center">
        <CurrentComponent />
        <div className="flex gap-4">
          {Array.from({ length: comments.length }, (_, index) => (
            <motion.button
              key={index}
              className={`rounded p-1 ${
                selectedIndex === index ? 'bg-blue-300' : 'bg-transparent'
              }`}
              onClick={() => setSelectedIndex(index)}
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
