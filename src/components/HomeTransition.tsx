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
      const timer = setTimeout(() => setIndex(index + 1), 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onEnd, 300);
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
        style={{
          fontSize: '2rem',
          marginRight: '1rem',
          padding: '1rem',
        }}
      >
        {languages[index]}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
            style={{
              fontSize: '4rem',
              backgroundColor: 'transparent',
              position: 'relative',
              zIndex: 1,
            }}
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
