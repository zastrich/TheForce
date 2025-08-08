---
sidebar_position: 2
title: Core Package
---

# @theforce/core

The core hand tracking library for TheForce, built on MediaPipe. This package provides the fundamental hand tracking capabilities and can be used independently or as a dependency for framework-specific integrations.

## Installation

```bash
npm install @theforce/core
# or
yarn add @theforce/core
```

### Important Note on Mediapipe Dependency:

For TheForce to function correctly, you **must** include the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point). This is a runtime dependency required by `@theforce/core`.

Please add the following script tags to your HTML file's `<head>` or before your main application script:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```

## Quick Start

```javascript
import { HandTracker } from "@theforce/core";

// Initialize the hand tracker with optional configuration
const tracker = new HandTracker({
  hoverDelay: 2000, // Time in milliseconds to hover before triggering a click (default: 2000ms)
  sensitivityX: 1.5, // Multiplier for horizontal cursor movement sensitivity (default: 1)
  sensitivityY: 1.5, // Multiplier for vertical cursor movement sensitivity (default: 1)
  cursorImageUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMkwxNyAxMkw3IDIyVjJaIiBmaWxsPSIjNGNhZjUwIi8+Cjwvc3ZnPgo=", // Optional: URL for a custom cursor image
  debug: true, // Set to true to display the camera feed in the bottom right corner for debugging
});

// Initialize the tracker (creates the virtual cursor element and sets up camera)
await tracker.initialize();

// Start tracking hands
await tracker.start();

// Listen for hand tracking results (e.g., hand landmarks)
tracker.onResults((results) => {
  const { multiHandLandmarks, multiHandedness } = results;
  // Process hand landmarks, e.g., to draw on a canvas or control UI
  if (multiHandLandmarks && multiHandLandmarks.length > 0) {
    console.log("Detected hands:", multiHandLandmarks);
  }
});

// To stop tracking
// await tracker.stop();
```

## Configuration Options

The `HandTracker` constructor accepts an optional configuration object with the following properties:

| Option                | Type      | Default | Description                                                                                                                                                                                                    |
| --------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hoverDelay`          | `number`  | `2000`  | Time in milliseconds to hover before triggering a click.                                                                                                                                                       |
| `sensitivityX`        | `number`  | `1`     | Multiplier for horizontal cursor movement sensitivity. Higher values make the cursor move faster horizontally.                                                                                                 |
| `sensitivityY`        | `number`  | `1`     | Multiplier for vertical cursor movement sensitivity. Higher values make the cursor move faster vertically.                                                                                                     |
| `cursorImageUrl`      | `string`  | `-`     | Optional URL for a custom image to be used as the virtual cursor. If not provided, a default red circle is used.                                                                                               |
| `cursorLandmarkIndex` | `number`  | `9`     | The index of the landmark to use for cursor positioning (e.g., 0 for wrist, 8 for index finger tip, 9 for middle finger base). Defaults to 9 (middle finger base) for a more central hand tracking experience. |
| `debug`               | `boolean` | `false` | If true, the camera feed will be displayed in the bottom right corner for debugging purposes.                                                                                                                  |

## CSS Classes

The library adds the following CSS classes to elements that you can style:

- `.force-hoverable`: Applied to elements with `data-hoverable="true"` attribute, indicating they can be interacted with.
- `.force-hover`: Applied to a `force-hoverable` element when the virtual cursor is hovering over it.
- `.force-loading`: Applied to the virtual cursor element when a hover action is in progress (e.g., waiting for `hoverDelay` to trigger a click). This class can be used to style the loading animation.

## Browser Support

This library relies on MediaPipe and WebRTC, requiring modern browser support:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
