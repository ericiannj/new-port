'use client';

import { useState, useEffect } from 'react';
import HomeTransition from './HomeTransition';

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(true);

  const handleEndTransition = () => {
    setShowTransition(false);
  };

  useEffect(() => {
    const timer = setTimeout(handleEndTransition, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showTransition && (
        <div className="fixed inset-0 z-100">
          <HomeTransition onEnd={handleEndTransition} />
        </div>
      )}
      <div
        className={`flex min-h-0 w-full flex-1 flex-col ${showTransition ? 'intro-playing' : ''}`}
      >
        {children}
      </div>
    </>
  );
}
