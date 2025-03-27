'use client';

import {
  motion,
  AnimatePresence,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

type TooltipProps = {
  show: boolean;
  x: MotionValue<number>;
  value: string;
};

const Tooltip = ({ show, x, value }: TooltipProps) => {
  const springConfig = { stiffness: 100, damping: 5 };

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-75, 75]),
    springConfig,
  );

  return (
    <AnimatePresence mode="wait">
      {!!show && (
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
          {value}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
