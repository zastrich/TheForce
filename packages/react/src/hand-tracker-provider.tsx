import React, { createContext, useContext, useRef, useCallback, useState, useEffect } from 'react';
import { HandTracker, HandTrackerConfig } from '@theforce/core';

interface HandTrackerContextType {
  handLandmarks: any[];
  initialize: (config?: HandTrackerConfig) => Promise<void>;
  stop: () => Promise<void>;
  isTracking: boolean;
}

const HandTrackerContext = createContext<HandTrackerContextType | null>(null);

interface HandTrackerProviderProps {
  children: React.ReactNode;
  config?: HandTrackerConfig;
  debug?: boolean;
}

export const HandTrackerProvider: React.FC<HandTrackerProviderProps> = ({
  children,
  config,
  debug
}) => {
  const [handLandmarks, setHandLandmarks] = useState<any[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const trackerRef = useRef<HandTracker | null>(null);

  const initialize = useCallback(async (
    customConfig?: HandTrackerConfig
  ) => {
    if (isTracking) return;

    const finalConfig = { ...config, ...customConfig, debug };
    trackerRef.current = new HandTracker(finalConfig);

    trackerRef.current.onResults((results) => {
      setHandLandmarks(results.multiHandLandmarks || []);
    });

    await trackerRef.current.start();
    setIsTracking(true);
  }, [config, isTracking, debug]);

  const stop = useCallback(async () => {
    if (!trackerRef.current || !isTracking) return;

    await trackerRef.current.stop();
    trackerRef.current = null;
    setIsTracking(false);
    setHandLandmarks([]);
  }, [isTracking]);

  useEffect(() => {
    return () => {
      if (trackerRef.current) {
        trackerRef.current.stop();
      }
    };
  }, []);

  const value: HandTrackerContextType = {
    handLandmarks,
    initialize,
    stop,
    isTracking,
  };

  return (
    <HandTrackerContext.Provider value={value}>
      {children}
    </HandTrackerContext.Provider>
  );
};

export const useHandTracker = (): HandTrackerContextType => {
  const context = useContext(HandTrackerContext);
  if (!context) {
    throw new Error('useHandTracker must be used within a HandTrackerProvider');
  }
  return context;
};

export const Hoverable: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`force-hoverable ${className}`}>
      {children}
    </div>
  );
};