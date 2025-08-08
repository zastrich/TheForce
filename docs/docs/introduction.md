---
sidebar_position: 1
title: Introduction
slug: /
---

# Welcome to TheForce Hand Tracking Library

<img src="/img/theforce-logo.png" alt="TheForce Logo"  />
  
TheForce is a comprehensive and intuitive hand tracking library built on top of MediaPipe, designed to bring gesture-based control to your web applications. With seamless integrations for popular JavaScript frameworks like React, Vue, and Angular, TheForce empowers developers to create immersive and accessible user experiences.

## What is TheForce?

At its core, TheForce leverages the power of MediaPipe's hand tracking capabilities to detect and interpret hand movements in real-time. This allows you to implement virtual mouse control, trigger actions with specific gestures, and build entirely new forms of interaction for your users.

### Key Features:

- **Real-time Hand Tracking:** Accurate and responsive hand detection and landmark tracking.
- **Framework Agnostic Core:** A robust core library that can be used with any JavaScript project.
- **Framework Integrations:** Dedicated packages for React, Vue, and Angular to simplify development.
- **Virtual Mouse Control:** Transform hand movements into precise cursor control.
- **Configurable Interactions:** Easily customize hover delays and movement sensitivity.
- **Extensible:** Designed to be extended with custom gestures and actions.

## Why Use TheForce?

In an increasingly interactive digital world, traditional input methods like mouse and keyboard can sometimes be limiting. TheForce opens up new possibilities for:

- **Accessibility:** Providing alternative input methods for users with motor impairments.
- **Interactive Kiosks & Displays:** Enabling touchless interaction in public spaces.
- **Gaming & Entertainment:** Creating unique and engaging game mechanics.
- **Creative Applications:** Exploring new forms of digital art and expression.
- **Enhanced User Experience:** Offering a more natural and intuitive way to interact with web content.

## How it Works

TheForce utilizes your device's camera to capture video input. MediaPipe then processes this video stream to identify hand landmarks (e.g., fingertips, knuckles). These landmarks are then translated into screen coordinates, allowing TheForce to simulate mouse movements and clicks.

### Important Note on Mediapipe Dependency:

For TheForce to function correctly, you **must** include the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point). This is a runtime dependency required by `@theforce/core`.

Please add the following script tags to your HTML file's `<head>` or before your main application script:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```

## See it in Action

Check out this video demonstrating TheForce in a live project:

<iframe width="560" height="315" src="https://www.youtube.com/embed/qoimrV3c0v4" title="TheForce Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Cases
Here are some example projects using TheForce:

| Preview | Description | URL |
|-|-|-|
| [<img src="/img/cases/theforce-cases.code200.com.br_lovable-showcase-example_.jpg" alt="Lovable Showcase Preview" />](https://theforce-cases.code200.com.br/lovable-showcase-example/) | Lovable Showcase Example. Build in Lovable.ai in 30 minutes. | [Access here](https://theforce-cases.code200.com.br/lovable-showcase-example/)|
|-| ➡️ YOUR PROJECT HERE ⬅️ |-|

## Get Started

Ready to integrate hand tracking into your project? Use your preferred method:

- **[Core Package](https://www.npmjs.com/package/@theforce/core):** `npm install @theforce/core`
- **[React Integration](https://www.npmjs.com/package/@theforce/react):** `npm install @theforce/react`
- **[Vue Integration](https://www.npmjs.com/package/@theforce/vue):** `npm install @theforce/vue`
- **[Angular Integration](https://www.npmjs.com/package/@theforce/angular):** `npm install @theforce/angular`
