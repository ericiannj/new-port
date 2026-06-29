'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import HomeTransition from './HomeTransition';

type IntroContextType = { introReady: boolean };
const IntroContext = createContext<IntroContextType>({ introReady: false });
export const useIntro = () => useContext(IntroContext);

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(true);
  const [introReady, setIntroReady] = useState(false);

  const handleEndTransition = useCallback(() => {
    setShowTransition(false);
    setIntroReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleEndTransition, 2000);
    return () => clearTimeout(timer);
  }, [handleEndTransition]);

  return (
    <IntroContext.Provider value={{ introReady }}>
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
    </IntroContext.Provider>
  );
}
