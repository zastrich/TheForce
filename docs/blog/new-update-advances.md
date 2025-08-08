---
slug: new-update-advances-en
title: Incredible Advances in TheForce's New Update!
authors: zastrich
tags: [update, camera, core, frameworks, integration]
---

We are super excited to announce a new update for TheForce, bringing significant advances that will revolutionize how you interact with our technology!

<!-- truncate -->

The main novelty of this update is the **integration of camera loading functionality directly into the `core` package**. This means that the base of TheForce now handles video capture natively and optimally, making the experience much more fluid and efficient.

### What does this mean for you?

- **Cleaner and easier integration:** Developers using TheForce in different frameworks (React, Angular, Vue, etc.) will notice a drastic simplification in integration. The complexity of camera loading has been abstracted to the core, allowing you to focus on your application's logic, not on hardware details.
- **Improved performance:** By centralizing camera loading in the core package, we've optimized the process to ensure better performance and lower resource consumption, regardless of the framework you're using.
- **Cross-platform consistency:** Ensures more consistent camera behavior across different environments and frameworks, reducing the need for specific adaptations for each.

This update is a giant step towards making TheForce even more powerful and easy to use. We believe this change will bring more agility to development and a superior experience for end-users.

Stay tuned for more news and tutorials on how to make the most of these new features!

### Important Note on Mediapipe Dependency:

For TheForce to function correctly, you **must** include the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point). This is a runtime dependency required by `@theforce/core`.

Please add the following script tags to your HTML file's `<head>` or before your main application script:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```
