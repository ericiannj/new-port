'use client';

import React, { useState } from 'react';

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  id: PositionId;
  className?: string;
}

type PositionId = 'education' | 'social networks' | 'location-based software';

type Position = {
  id: PositionId;
  name: string;
  designation: string;
  // image: string;
};

const positions: Position[] = [
  {
    id: 'education',
    name: 'Grupo Portfolio',
    designation: 'Software Development Internship',
  },
  {
    id: 'social networks',
    name: 'Big Brain',
    designation: 'Full Stack Developer',
  },
  {
    id: 'location-based software',
    name: 'Beakyn',
    designation: 'Full Stack Developer',
  },
];

const Tooltip = ({ children, id, className }: TooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<PositionId | null>(null);
  console.log('hoveredIndex', hoveredIndex);
  const selectedPosition = positions.find((position) => position.id === id);

  const springConfig = { stiffness: 100, damping: 5 };

  const x = useMotionValue(0); // going to set this value on mouse move

  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // befora was target
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  console.log('selectedPosition', selectedPosition);

  if (!selectedPosition) {
    return <>{children}</>;
  }

  return (
    <span className="relative mr-4 inline-block">
      <div
        className="group relative -mr-4"
        key={selectedPosition.name}
        onMouseEnter={() => setHoveredIndex(selectedPosition.id)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence mode="wait">
          {hoveredIndex === selectedPosition.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className={`${className} absolute -top-16 z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl`}
            >
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <div className="absolute -bottom-px z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="relative z-30 text-fluid-base font-bold text-white">
                {selectedPosition.name}
              </div>
              <div className="text-xs text-white">
                {selectedPosition.designation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <span onMouseMove={handleMouseMove}>{children}</span>
      </div>
    </span>
  );
};

export default Tooltip;
