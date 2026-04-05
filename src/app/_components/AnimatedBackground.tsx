'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Circle {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  xOffset: number;
  yOffset: number;
  duration: number;
  delay: number;
}

function generateCircles(): Circle[] {
  return [...Array(20)].map((_, i) => ({
    id: i,
    width: Math.random() * 100 + 50,
    height: Math.random() * 100 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    xOffset: Math.random() * 100 - 50,
    yOffset: Math.random() * 100 - 50,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
}

const AnimatedBackground = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- generate random values only on client to avoid hydration mismatch
  useEffect(() => setCircles(generateCircles()), []);

  if (circles.length === 0) return <div className="fixed inset-0 -z-10" />;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-white/5"
          style={{
            width: circle.width,
            height: circle.height,
            left: circle.left,
            top: circle.top,
          }}
          animate={{
            x: [0, circle.xOffset, 0],
            y: [0, circle.yOffset, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: circle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
