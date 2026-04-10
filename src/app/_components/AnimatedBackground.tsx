'use client';

import { useState, useEffect } from 'react';

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
        <div
          key={circle.id}
          className="animate-float absolute rounded-full bg-white/5"
          style={{
            width: circle.width,
            height: circle.height,
            left: circle.left,
            top: circle.top,
            animationDelay: `${circle.delay}s`,
            '--float-x': `${circle.xOffset}px`,
            '--float-y': `${circle.yOffset}px`,
            '--float-duration': `${circle.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
