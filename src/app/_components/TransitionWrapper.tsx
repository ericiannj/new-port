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

  if (showTransition) {
    return <HomeTransition onEnd={handleEndTransition} />;
  }

  return <>{children}</>;
}
