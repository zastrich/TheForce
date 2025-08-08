---
sidebar_position: 5
title: Angular Integration
---

# @theforce/angular

Angular integration for TheForce Hand Tracking Library. This package provides a `HandTrackerService` and a `HoverableDirective` to easily integrate hand tracking into your Angular applications.

## Installation

```bash
npm install @theforce/angular @theforce/core
# or
yarn add @theforce/angular @theforce/core
```

### Important Note on Mediapipe Dependency:

For TheForce to function correctly, you **must** include the Mediapipe library from a CDN in your project's `index.html` (or equivalent entry point). This is a runtime dependency required by `@theforce/core`.

Please add the following script tags to your HTML file's `<head>` or before your main application script:

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```

## Quick Start

1.  **Import `HandTrackerModule`**: Add `HandTrackerModule` to your `AppModule` or any feature module where you intend to use the hand tracking service or directive.

    ```typescript
    // app.module.ts
    import { NgModule } from "@angular/core";
    import { BrowserModule } from "@angular/platform-browser";
    import { HandTrackerModule } from "@theforce/angular";
    import { AppComponent } from "./app.component";

    @NgModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        HandTrackerModule, // Add HandTrackerModule here
      ],
      providers: [],
      bootstrap: [AppComponent],
    })
    export class AppModule {}
    ```

2.  **Use `HandTrackerService` in your component**: Inject `HandTrackerService` into your component and use its methods to control hand tracking.

    ```typescript
    // app.component.ts
    import { Component, OnInit, OnDestroy } from "@angular/core";
    import { HandTrackerService } from "@theforce/angular";
    import { HandTrackerConfig } from "@theforce/core"; // Import HandTrackerConfig

    @Component({
      selector: "app-root",
      template: `
        <div>
          <h1>Hand Tracking Demo (Angular)</h1>
          <button (click)="startTracking()">Start Tracking</button>
          <button (click)="stopTracking()">Stop Tracking</button>

          <div
            appHoverable
            style="padding: 20px; border: 1px solid gray; margin-top: 20px;"
          >
            Hover over me with your hand!
          </div>
        </div>
      `,
      styleUrls: ["./app.component.css"],
    })
    export class AppComponent implements OnInit, OnDestroy {
      constructor(private handTrackerService: HandTrackerService) {}

      ngOnInit() {
        const config: HandTrackerConfig = {
          hoverDelay: 1000,
          sensitivityX: 1.5,
          sensitivityY: 1.5,
          debug: true, // Set to true to display the camera feed in the bottom right corner for debugging
        };
        this.handTrackerService.initialize(config);
        this.handTrackerService.handLandmarks$.subscribe((landmarks) => {
          // Process hand landmarks
          console.log("Hand landmarks:", landmarks);
        });
      }

      ngOnDestroy() {
        this.handTrackerService.stop();
      }

      async startTracking() {
        await this.handTrackerService.start();
      }

      async stopTracking() {
        await this.handTrackerService.stop();
      }
    }
    ```

## `HandTrackerService`

This service provides methods to control the hand tracking functionality and observables to subscribe to hand tracking results.

| Property/Method                          | Type                | Description                                               |
| ---------------------------------------- | ------------------- | --------------------------------------------------------- |
| `handLandmarks$`                         | `Observable<any[]>` | An observable that emits detected hand landmarks.         |
| `tracking`                               | `boolean`           | Indicates if hand tracking is currently active.           |
| `initialize(config?: HandTrackerConfig)` | `Promise<void>`     | Initializes the hand tracker with optional configuration. |
| `start(config?: HandTrackerConfig)`      | `Promise<void>`     | Starts hand tracking with optional configuration.         |
| `stop()`                                 | `Promise<void>`     | Stops hand tracking and cleans up resources.              |
| `restart(config?: HandTrackerConfig)`    | `Promise<void>`     | Stops, then restarts hand tracking.                       |

## `HoverableDirective`

This directive can be applied to any HTML element to make it interactive with the virtual hand tracking cursor. When the virtual cursor hovers over an element with this directive, the `force-hover` CSS class will be applied.

```html
<div appHoverable>
  <!-- Your content here -->
</div>
```

## Configuration Options

The `initialize` and `start` methods of `HandTrackerService` accept an optional `HandTrackerConfig` object. These options are passed directly to the underlying `@theforce/core` `HandTracker` instance. See `@theforce/core` documentation for available options like `hoverDelay`, `sensitivityX`, `sensitivityY`, `cursorImageUrl`, and `debug`.

## Styling Hoverable Elements

Elements with the `appHoverable` directive will have the following CSS classes applied by the core library, which you can style:

- `.force-hoverable`: Always present on elements with `appHoverable` directive.
- `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
