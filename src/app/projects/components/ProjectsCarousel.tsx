'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedProjectCard from './ProjectCard';
import { projects } from '../data';

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
    <div className="mt-6 flex w-full max-w-full flex-col items-center gap-4 md:mt-12">
      <motion.div
        className="flex w-full max-w-full items-center justify-center gap-0 md:gap-8"
        layout
      >
        {orderedProjects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            className={
              index === 1
                ? 'w-full max-w-full md:w-auto'
                : 'hidden w-full max-w-full md:block md:w-auto'
            }
            animate={{
              scale: index === 1 ? 1.05 : 0.9,
              opacity: index === 1 ? 1 : 0.55,
            }}
            whileHover={{
              opacity: index === 1 ? 1 : 0.75,
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedProjectCard project={project} priority={index === 1} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-4 flex gap-4">
        <motion.button
          aria-label="Previous project"
          className="rounded-full bg-gray-800/50 p-1.5 transition-colors hover:bg-gray-800/70 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </motion.button>
        <motion.button
          aria-label="Next project"
          className="rounded-full bg-gray-800/50 p-1.5 transition-colors hover:bg-gray-800/70 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
