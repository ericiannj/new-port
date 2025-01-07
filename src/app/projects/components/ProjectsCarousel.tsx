'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedProjectCard from './ProjectCard';

import StocksManagerImage from '../../../assets/images/stocks-manager.png';
import Web3VoteImage from '../../../assets/images/web3vote.png';
import IndyImage from '../../../assets/images/indy.png';

const ProjectsCarousel = () => {
  const [orderedProjects, setOrderedProjects] = useState(projects);

  const handlePrevious = () => {
    setOrderedProjects((prev) => {
      const newOrder = [...prev];
      const lastItem = newOrder.pop()!;
      newOrder.unshift(lastItem);
      return newOrder;
    });
  };

  const handleNext = () => {
    setOrderedProjects((prev) => {
      const newOrder = [...prev];
      const firstItem = newOrder.shift()!;
      newOrder.push(firstItem);
      return newOrder;
    });
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <motion.div className="flex items-center justify-center gap-8" layout>
        {orderedProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="cursor-pointer"
            layout
            animate={{
              scale: index === 1 ? 1.1 : 0.9,
              opacity: index === 1 ? 1 : 0.5,
            }}
            whileHover={{
              opacity: index === 1 ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedProjectCard
              title={project.title}
              image={project.image}
              link={project.link}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-4 flex gap-4">
        <motion.button
          className="rounded-full bg-gray-800/50 p-1.5 transition-colors hover:bg-gray-800/70"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <motion.button
          className="rounded-full bg-gray-800/50 p-1.5 transition-colors hover:bg-gray-800/70"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectsCarousel;

const projects = [
  {
    title: 'Stocks Manager',
    image: StocksManagerImage,
    link: 'https://github.com/ericiannj/stocks-manager',
  },
  {
    title: 'Indy',
    image: IndyImage,
    link: 'https://github.com/ericiannj/Indy',
  },
  {
    title: 'Web3Vote',
    image: Web3VoteImage,
    link: 'https://github.com/ericiannj/web3vote',
  },
];
