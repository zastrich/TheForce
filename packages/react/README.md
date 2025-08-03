# @theforce/react

React integration for TheForce Hand Tracking Library. This package provides a `HandTrackerProvider` component and a `useHandTracker` hook to easily integrate hand tracking into your React applications.

## Installation

```bash
npm install @theforce/react @theforce/core
# or
yarn add @theforce/react @theforce/core
```

## Quick Start

Wrap your application or the relevant part of your component tree with `HandTrackerProvider`.

```jsx
import React, { useRef, useEffect } from 'react';
import { HandTrackerProvider, useHandTracker } from '@theforce/react';

function App() {
  // Optional: Configure hoverDelay and sensitivity for the HandTracker instance
  const config = {
    hoverDelay: 2000, // Time in milliseconds to hover before triggering a click
    sensitivityX: 1.5, // Multiplier for horizontal cursor movement sensitivity
    sensitivityY: 1.5, // Multiplier for vertical cursor movement sensitivity
  };

  return (
    <HandTrackerProvider config={config}>
      <HandTrackingDemo />
    </HandTrackerProvider>
  );
}

function HandTrackingDemo() {
  const { handLandmarks, isTracking, initialize, stop } = useHandTracker();
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize camera and start tracking when the component mounts
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          await initialize(videoRef.current); // Pass the video element to the tracker
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
      }
    };
    init();

    // Cleanup on component unmount
    return () => {
      stop();
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [initialize, stop]);

  return (
    <div>
      <h1>Hand Tracking Demo (React)</h1>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', maxWidth: '640px' }} />
      <p>Status: {isTracking ? 'Tracking' : 'Stopped'}</p>
      
      <div data-hoverable="true" style={{ padding: '20px', border: '1px solid gray', marginTop: '20px' }}>
        Hover over me with your hand!
      </div>
    </div>
  );
}

export default App;
```

## `HandTrackerProvider` Props

| Prop   | Type   | Default | Description                                           |
| ------ | ------ | ------- | ----------------------------------------------------- |
| `config` | `object` | `{}`      | Configuration object for the underlying `HandTracker` instance. See `@theforce/core` documentation for available options like `hoverDelay`, `sensitivityX`, `sensitivityY`, `cursorImageUrl`, `actionImageUrl`. |

## `useHandTracker` Hook

This hook provides access to the hand tracking state and control functions.

```javascript
const { handLandmarks, isTracking, initialize, stop } = useHandTracker();
```

| Property        | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| `handLandmarks` | `Array<any>` | An array of detected hand landmarks. Empty if no hands are detected. |
| `isTracking`    | `boolean` | `true` if hand tracking is active, `false` otherwise. |
| `initialize`    | `(videoElement: HTMLVideoElement) => Promise<void>` | Function to initialize and start hand tracking. Takes a video element as input. |
| `stop`          | `() => Promise<void>` | Function to stop hand tracking and clean up resources. |

## Styling Hoverable Elements

Elements marked with `data-hoverable="true"` will have the following CSS classes applied by the core library, which you can style:

-   `.force-hoverable`: Always present on elements with `data-hoverable="true"`.
-   `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
