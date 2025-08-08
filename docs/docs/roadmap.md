---
sidebar_position: 6
title: Roadmap
---

## Planned Features

Here are the features we are currently planning to implement:

- ⌛ **Inclusion of 2 cursors at the same time:** Allow for dual-hand control and interaction.
- ⌛ **Drag and drop function for items on the screen:** Enable users to pick up and move elements using hand gestures.

## Completed Milestones

Here are the key milestones we have successfully completed:

### Version 1.4.0 (2025-08-06)

- ✅ **Core:** Includes camera loading functionality directly in the core package.
- ✅ **React:** Simplified integration with camera loading handled by the core package.
- ✅ **Angular:** Simplified integration with camera loading handled by the core package.
- ✅ **VueJS:** Simplified integration with camera loading handled by the core package.

### Version 1.0.0 (2025-08-04)

- ✅ **Core:** The initial stable release of TheForce library for the core functionality.
- ✅ **React:** The initial stable release of TheForce library for React.
- ✅ **Angular:** The initial stable release of TheForce library for Angular.
- ✅ **VueJS:** The initial stable release of TheForce library for VueJS.
- ✅ **Publication of Version 1 of the Library:** The initial stable release of TheForce library.

### Important Note on Mediapipe Dependency:

For TheForce to function correctly, you **must** include the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point). This is a runtime dependency required by `@theforce/core`.

Please add the following script tags to your HTML file's `<head>` or before your main application script:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```
