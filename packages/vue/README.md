# @theforce/vue

Vue integration for TheForce Hand Tracking Library. This package provides `useHandTracker` composable and `Hoverable` component to easily integrate hand tracking into your Vue 3 applications.

## Installation

```bash
npm install @theforce/vue @theforce/core
# or
yarn add @theforce/vue @theforce/core
```

## Quick Start

```vue
<template>
  <div class="app">
    <h1>Hand Tracking Demo (Vue)</h1>
    <video ref="videoRef" autoplay muted playsinline style="width: 100%; max-width: 640px;" />
    <p>Status: {{ isTracking ? 'Tracking' : 'Stopped' }}</p>
    
    <Hoverable style="padding: 20px; border: 1px solid gray; margin-top: 20px;">
      Hover over me with your hand!
    </Hoverable>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useHandTracker, Hoverable } from '@theforce/vue';

// Optional: Configure hoverDelay and sensitivity for the HandTracker instance
const config = {
  hoverDelay: 2000, // Time in milliseconds to hover before triggering a click
  sensitivityX: 1.5, // Multiplier for horizontal cursor movement sensitivity
  sensitivityY: 1.5, // Multiplier for vertical cursor movement sensitivity
};

const { handLandmarks, isTracking, initialize, stop } = useHandTracker(config);
const videoRef = ref(null);

onMounted(async () => {
  // Initialize camera and start tracking when the component mounts
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
    });
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      await videoRef.value.play();
      await initialize(videoRef.value); // Pass the video element to the tracker
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Unable to access camera. Please check permissions.');
  }
});

onUnmounted(() => {
  // Cleanup on component unmount
  stop();
  if (videoRef.value && videoRef.value.srcObject) {
    const tracks = videoRef.value.srcObject.getTracks();
    tracks.forEach(track => track.stop());
  }
});
</script>

<style scoped>
.app {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
}
</style>
```

## `useHandTracker` Composable

This composable provides access to the hand tracking state and control functions.

```javascript
const { handLandmarks, isTracking, initialize, stop } = useHandTracker(config);
```

| Property        | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| `handLandmarks` | `Array<any>` | A reactive array of detected hand landmarks. Empty if no hands are detected. |
| `isTracking`    | `boolean` | A reactive boolean indicating if hand tracking is active. |
| `initialize`    | `(videoElement: HTMLVideoElement) => Promise<void>` | Function to initialize and start hand tracking. Takes a video element as input. |
| `stop`          | `() => Promise<void>` | Function to stop hand tracking and clean up resources. |

## `Hoverable` Component

This component is a wrapper that automatically applies `data-hoverable="true"` to its content, making it interactive with the virtual cursor.

```vue
<Hoverable>
  <!-- Your content here -->
</Hoverable>
```

## Configuration Options

The `useHandTracker` composable accepts an optional configuration object. These options are passed directly to the underlying `@theforce/core` `HandTracker` instance:

| Option           | Type   | Default | Description                                           |
| ---------------- | ------ | ------- | ----------------------------------------------------- |
| `hoverDelay`     | `number` | `2000`    | Time in milliseconds to hover before triggering a click. |
| `sensitivityX`   | `number` | `1`       | Multiplier for horizontal cursor movement sensitivity. Higher values make the cursor move faster horizontally. |
| `sensitivityY`   | `number` | `1`       | Multiplier for vertical cursor movement sensitivity. Higher values make the cursor move faster vertically. |
| `cursorImageUrl` | `string` | `-`       | Optional URL for a custom image to be used as the virtual cursor. If not provided, a default red circle is used. |
| `actionImageUrl` | `string` | `-`       | Optional URL for an image to indicate an action (e.g., a click animation). (Currently not implemented in core) |

## Styling Hoverable Elements

Elements wrapped by `Hoverable` will have the following CSS classes applied by the core library, which you can style:

-   `.force-hoverable`: Always present on elements with `data-hoverable="true"`.
-   `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
