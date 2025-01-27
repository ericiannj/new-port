'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import ProfileImage from '../../../assets/images/profile.jpeg';

const CustomProfileImage = () => {
  const [showIcons, setShowIcons] = useState<boolean>(false);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-75, 75]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="mb-16 flex w-full flex-row items-center justify-center">
      <div
        className="group relative flex flex-col items-center"
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <Image
          onMouseMove={handleMouseMove}
          src={ProfileImage}
          alt="Profile Image"
          className="relative !m-0 h-28 w-28 rounded-full object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
        />
        <AnimatePresence mode="wait">
          {!!showIcons && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.6 }}
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
              exit={{ opacity: 0, y: -20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className="absolute top-32 z-50 flex items-center justify-center rounded-lg bg-slate-900 px-8 py-4 text-2xl shadow-xl"
            >
              👨🏾‍💻 🏋🏾‍♂️ 🗺️ 🛫 🍃
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomProfileImage;
