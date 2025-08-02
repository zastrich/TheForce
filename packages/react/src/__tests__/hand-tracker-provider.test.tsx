import React, { useRef, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HandTrackerProvider, useHandTracker } from '../hand-tracker-provider';

// Mock the core HandTracker
jest.mock('@theforce/core', () => ({
  HandTracker: jest.fn().mockImplementation(() => ({
    onResults: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

const TestComponent: React.FC = () => {
  const { handLandmarks, isTracking, initialize, stop } = useHandTracker();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      initialize(videoRef.current);
    }
  }, [initialize]);

  return (
    <div>
      <video ref={videoRef} />
      <div data-testid="landmarks-count">{handLandmarks.length}</div>
      <div data-testid="tracking-status">{isTracking ? 'tracking' : 'stopped'}</div>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
};

describe('HandTrackerProvider', () => {
  it('should provide hand tracker context', () => {
    render(
      <HandTrackerProvider>
        <TestComponent />
      </HandTrackerProvider>
    );

    expect(screen.getByTestId('landmarks-count')).toBeInTheDocument();
    expect(screen.getByTestId('tracking-status')).toBeInTheDocument();
  });

  it('should initialize with custom config', () => {
    const config = { hoverDelay: 2000 };
    
    render(
      <HandTrackerProvider config={config}>
        <TestComponent />
      </HandTrackerProvider>
    );

    expect(screen.getByTestId('landmarks-count')).toBeInTheDocument();
  });
});

describe('useHandTracker', () => {
  it('should throw error when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      useHandTracker();
      return <div>Test</div>;
    };

    expect(() => {
      render(<TestComponentWithoutProvider />);
    }).toThrow('useHandTracker must be used within a HandTrackerProvider');
  });

  it('should provide hand tracker functionality', async () => {
    render(
      <HandTrackerProvider>
        <TestComponent />
      </HandTrackerProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('tracking-status')).toHaveTextContent('tracking');
    });
  });
}); 