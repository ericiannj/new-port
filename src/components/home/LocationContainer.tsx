'use client';

import { Icons } from '@/icons';
import { motion } from 'framer-motion';

const LocationContainer = () => {
  return (
    <div className="flex h-24 w-28 flex-row items-center gap-x-2 rounded-r-full bg-slate-400 p-4 md:w-60">
      <p className="hidden w-32 md:block">Currently located in Brazil</p>
      <motion.div
        className="m-0 h-20 w-20 rounded-full"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 2, ease: 'linear' }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <Icons.brazil />
      </motion.div>
    </div>
  );
};

export default LocationContainer;
