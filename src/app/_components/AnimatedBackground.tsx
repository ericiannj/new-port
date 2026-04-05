'use client';

import { motion } from 'framer-motion';

const circles = [...Array(20)].map((_, i) => ({
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

const AnimatedBackground = () => {
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
