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
    <p>Status: {{ isTracking ? "Tracking" : "Stopped" }}</p>

    <Hoverable style="padding: 20px; border: 1px solid gray; margin-top: 20px;">
      Hover over me with your hand!
    </Hoverable>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useHandTracker, Hoverable } from "@theforce/vue";

// Optional: Configure hoverDelay and sensitivity for the HandTracker instance
const config = {
  hoverDelay: 2000, // Time in milliseconds to hover before triggering a click
  sensitivityX: 1.5, // Multiplier for horizontal cursor movement sensitivity
  sensitivityY: 1.5, // Multiplier for vertical cursor movement sensitivity
  debug: true, // Set to true to display the camera feed in the bottom right corner for debugging
};

const { handLandmarks, isTracking, initialize, stop } = useHandTracker(config);

onMounted(async () => {
  // Initialize and start tracking when the component mounts
  await initialize();
});

onUnmounted(() => {
  // Cleanup on component unmount
  stop();
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

| Property        | Type                  | Description                                                                  |
| --------------- | --------------------- | ---------------------------------------------------------------------------- |
| `handLandmarks` | `Array<any>`          | A reactive array of detected hand landmarks. Empty if no hands are detected. |
| `isTracking`    | `boolean`             | A reactive boolean indicating if hand tracking is active.                    |
| `initialize`    | `() => Promise<void>` | Function to initialize and start hand tracking.                              |
| `stop`          | `() => Promise<void>` | Function to stop hand tracking and clean up resources.                       |

## `Hoverable` Component

This component is a wrapper that automatically applies `data-hoverable="true"` to its content, making it interactive with the virtual cursor.

```vue
<Hoverable>
  <!-- Your content here -->
</Hoverable>
```

## Configuration Options

The `useHandTracker` composable accepts an optional configuration object. These options are passed directly to the underlying `@theforce/core` `HandTracker` instance:

| Option                | Type      | Default | Description                                                                                                                                                                                                    |
| --------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hoverDelay`          | `number`  | `2000`  | Time in milliseconds to hover before triggering a click.                                                                                                                                                       |
| `sensitivityX`        | `number`  | `1`     | Multiplier for horizontal cursor movement sensitivity. Higher values make the cursor move faster horizontally.                                                                                                 |
| `sensitivityY`        | `number`  | `1`     | Multiplier for vertical cursor movement sensitivity. Higher values make the cursor move faster vertically.                                                                                                     |
| `cursorImageUrl`      | `string`  | `-`     | Optional URL for a custom image to be used as the virtual cursor. If not provided, a default red circle is used.                                                                                               |
| `cursorLandmarkIndex` | `number`  | `9`     | The index of the landmark to use for cursor positioning (e.g., 0 for wrist, 8 for index finger tip, 9 for middle finger base). Defaults to 9 (middle finger base) for a more central hand tracking experience. |
| `debug`               | `boolean` | `false` | If true, the camera feed will be displayed in the bottom right corner for debugging purposes.                                                                                                                  |

## Styling Hoverable Elements

Elements wrapped by `Hoverable` will have the following CSS classes applied by the core library, which you can style:

- `.force-hoverable`: Always present on elements with `data-hoverable="true"`.
- `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
