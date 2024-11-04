'use client';

import HomeTransition from '@/components/HomeTransition';
import { useState } from 'react';

export default function Home() {
  const [showTransition, setShowTransition] = useState(true);

  const handleEndTransition = () => {
    setShowTransition(false);
  };

  if (showTransition) {
    return <HomeTransition onEnd={handleEndTransition} />;
  }

  return (
    <div>
      <h1 className="text-2xl">Home</h1>
    </div>
  );
}
