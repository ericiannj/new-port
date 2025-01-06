// AnimatedProjectCard.tsx
'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface AnimatedProjectCardProps {
  title: string;
  image: StaticImageData;
}

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const overlayVariants = {
  initial: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  hover: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function AnimatedProjectCard({
  title,
  image,
}: AnimatedProjectCardProps) {
  return (
    <motion.div
      className="relative w-[400px] cursor-pointer overflow-hidden rounded-lg"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Dark overlay with project name */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={overlayVariants}
        transition={{ duration: 0.2 }}
      >
        <motion.h3
          className="text-2xl font-bold text-white"
          variants={titleVariants}
        >
          {title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}
