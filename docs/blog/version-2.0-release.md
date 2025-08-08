---
id: version-2.0-release
title: TheForce v2.0 Released!
authors: [zastrich]
tags: [release, update, mediapipe]
---

We are thrilled to announce the release of **TheForce v2.0**! This new version brings significant improvements and new features to our hand-tracking library.

### Important Note for All Users:

With this release, it is now **mandatory** to import the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point) for TheForce to function correctly. This ensures optimal performance and access to the latest Mediapipe updates.

**Please add the following script tags to your HTML file's `<head>` or before your main application script:**

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```

We hope you enjoy TheForce v2.0!