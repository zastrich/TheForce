---
sidebar_position: 3
title: React Integration
---

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
import React, { useEffect } from "react";
import { HandTrackerProvider, useHandTracker } from "@theforce/react";

function HandTrackingDemo() {
  const { isTracking, initialize, stop } = useHandTracker();

  useEffect(() => {
    // Initialize tracking when the component mounts
    initialize();

    return () => {
      // Stop tracking when the component unmounts
      stop();
    };
  }, []);

  const handleButtonClick = (button) => {
    const currentCount = parseInt(
      button.target.getAttribute("data-count") || "0",
      10,
    );
    button.target.setAttribute("data-count", currentCount + 1);
    button.target.textContent = `Button Clicked ${currentCount + 1} times`;
  };

  return (
    <>
      <button
        data-hoverable="true"
        onClick={handleButtonClick}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Button Clicked 0 times
      </button>
    </>
  );
}

function App() {
  const config = {
    hoverDelay: 1000,
    sensitivityX: 1.5,
    sensitivityY: 1.5,
  };

  return (
    <HandTrackerProvider config={config} debug={true}>
      <HandTrackingDemo />
    </HandTrackerProvider>
  );
}

export default App;
```

## `HandTrackerProvider` Props

| Prop     | Type      | Default | Description                                                                                                                                                                                                          |
| -------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config` | `object`  | `{}`    | Configuration object for the underlying `HandTracker` instance. See `@theforce/core` documentation for available options like `hoverDelay`, `sensitivityX`, `sensitivityY`, `cursorImageUrl`, `cursorLandmarkIndex`. |
| `debug`  | `boolean` | `false` | If true, the camera feed will be displayed in the bottom right corner for debugging purposes.                                                                                                                        |

## `useHandTracker` Hook

This hook provides access to the hand tracking state and control functions.

```javascript
const { handLandmarks, isTracking, initialize, stop } = useHandTracker();
```

| Property        | Type                  | Description                                                          |
| --------------- | --------------------- | -------------------------------------------------------------------- |
| `handLandmarks` | `Array<any>`          | An array of detected hand landmarks. Empty if no hands are detected. |
| `isTracking`    | `boolean`             | `true` if hand tracking is active, `false` otherwise.                |
| `initialize`    | `() => Promise<void>` | Function to initialize and start hand tracking.                      |
| `stop`          | `() => Promise<void>` | Function to stop hand tracking and clean up resources.               |

## Styling Hoverable Elements

Elements marked with `data-hoverable="true"` will have the following CSS classes applied by the core library, which you can style:

- `.force-hoverable`: Always present on elements with `data-hoverable="true"`.
- `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
