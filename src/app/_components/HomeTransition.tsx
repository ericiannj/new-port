'use client';

import { Icons } from '@/icons';
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
    <div className="z-10 flex h-screen w-full flex-row items-center justify-center bg-linear-to-b from-[#0a0a0a] to-[#0f172a]">
      <div className="animate-fade-in m-8 inline-block p-4 text-center text-3xl">
        {languages[index]}
        <div className="relative mt-6 flex items-center justify-center">
          <div className="animate-spin-slow">
            <Icons.globe size={64} />
          </div>
        </div>
      </div>
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
