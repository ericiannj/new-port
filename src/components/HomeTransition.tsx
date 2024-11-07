import { Icons } from '@/icons';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type HomeTransitionProps = {
  onEnd: () => void;
};

export default function HomeTransition({ onEnd }: HomeTransitionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < languages.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onEnd, 200);
      return () => clearTimeout(timer);
    }
  }, [index, onEnd]);

  return (
    <div className="z-10 flex h-screen w-full flex-row items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="m-8 mr-4 inline-block p-4 text-3xl"
      >
        {languages[index]}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          >
            <Icons.globe size={64} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

const languages = [
  'Olá',
  'Hello',
  'Hola',
  'Hallo',
  'Bonjour',
  'Hej',
  'Ciao',
  '你好',
  'こんにちは',
  '안녕하세요',
];
