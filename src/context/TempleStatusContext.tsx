'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface TempleStatusContextType {
  isTempleLive: boolean;
  toggleTempleLive: () => void;
  setTempleLive: (live: boolean) => void;
}

const TempleStatusContext = createContext<TempleStatusContextType>({
  isTempleLive: true,
  toggleTempleLive: () => {},
  setTempleLive: () => {},
});

export function TempleStatusProvider({ children }: { children: React.ReactNode }) {
  const [isTempleLive, setIsTempleLiveState] = useState<boolean>(true);

  // Read saved preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aaradhya_temple_live');
      if (saved !== null) {
        setIsTempleLiveState(saved === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const setTempleLive = (live: boolean) => {
    setIsTempleLiveState(live);
    try {
      localStorage.setItem('aaradhya_temple_live', String(live));
      window.dispatchEvent(new Event('temple-status-changed'));
    } catch {
      // ignore
    }
  };

  const toggleTempleLive = () => {
    setTempleLive(!isTempleLive);
  };

  return (
    <TempleStatusContext.Provider
      value={{
        isTempleLive,
        toggleTempleLive,
        setTempleLive,
      }}
    >
      {children}
    </TempleStatusContext.Provider>
  );
}

export function useTempleStatus() {
  return useContext(TempleStatusContext);
}
