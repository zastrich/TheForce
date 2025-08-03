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

## Quick Start

1.  **Import `HandTrackerModule`**: Add `HandTrackerModule` to your `AppModule` or any feature module where you intend to use the hand tracking service or directive.

    ```typescript
    // app.module.ts
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { HandTrackerModule } from '@theforce/angular';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HandTrackerModule // Add HandTrackerModule here
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2.  **Use `HandTrackerService` in your component**: Inject `HandTrackerService` into your component and use its methods to control hand tracking.

    ```typescript
    // app.component.ts
    import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
    import { HandTrackerService } from '@theforce/angular';
    import { HandTrackerConfig } from '@theforce/core'; // Import HandTrackerConfig

    @Component({
      selector: 'app-root',
      template: `
        <div>
          <h1>Hand Tracking Demo (Angular)</h1>
          <video #videoElement autoplay muted playsinline style="width: 100%; max-width: 640px;"></video>
          <button (click)="startTracking()">Start Tracking</button>
          <button (click)="stopTracking()">Stop Tracking</button>

          <div appHoverable style="padding: 20px; border: 1px solid gray; margin-top: 20px;">
            Hover over me with your hand!
          </div>
        </div>
      `,
      styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit, OnDestroy {
      @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
      stream: MediaStream | null = null;

      constructor(private handTrackerService: HandTrackerService) {}

      ngOnInit() {
        this.initializeCamera();
        this.handTrackerService.handLandmarks$.subscribe(landmarks => {
          // Process hand landmarks
          console.log('Hand landmarks:', landmarks);
        });
      }

      ngOnDestroy() {
        this.cleanup();
      }

      async initializeCamera() {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
          });
          this.videoElement.nativeElement.srcObject = this.stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
          alert('Unable to access camera. Please check permissions.');
        }
      }

      async startTracking() {
        if (this.videoElement.nativeElement && this.stream) {
          const config: HandTrackerConfig = {
            hoverDelay: 2000, // Time in milliseconds to hover before triggering a click
            sensitivityX: 1.5, // Multiplier for horizontal cursor movement sensitivity
            sensitivityY: 1.5, // Multiplier for vertical cursor movement sensitivity
          };
          await this.handTrackerService.start(this.videoElement.nativeElement, config);
        }
      }

      async stopTracking() {
        await this.handTrackerService.stop();
      }

      private cleanup() {
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
        }
      }
    }
    ```

## `HandTrackerService`

This service provides methods to control the hand tracking functionality and observables to subscribe to hand tracking results.

| Property/Method | Type                                     | Description                                           |
| --------------- | ---------------------------------------- | ----------------------------------------------------- |
| `handLandmarks$`  | `Observable<any[]>`                      | An observable that emits detected hand landmarks. |
| `tracking`      | `boolean`                                | Indicates if hand tracking is currently active. |
| `initialize(config?: HandTrackerConfig)` | `Promise<void>`                          | Initializes the hand tracker with optional configuration. |
| `start(videoElement: HTMLVideoElement, config?: HandTrackerConfig)` | `Promise<void>`                          | Starts hand tracking using the provided video element and optional configuration. |
| `stop()`        | `Promise<void>`                          | Stops hand tracking and cleans up resources. |
| `restart(videoElement: HTMLVideoElement, config?: HandTrackerConfig)` | `Promise<void>`                          | Stops, then restarts hand tracking. |

## `HoverableDirective`

This directive can be applied to any HTML element to make it interactive with the virtual hand tracking cursor. When the virtual cursor hovers over an element with this directive, the `force-hover` CSS class will be applied.

```html
<div appHoverable>
  <!-- Your content here -->
</div>
```

## Configuration Options

The `initialize` and `start` methods of `HandTrackerService` accept an optional `HandTrackerConfig` object. These options are passed directly to the underlying `@theforce/core` `HandTracker` instance. See `@theforce/core` documentation for available options like `hoverDelay`, `sensitivityX`, `sensitivityY`, `cursorImageUrl`, `actionImageUrl`.

## Styling Hoverable Elements

Elements with the `appHoverable` directive will have the following CSS classes applied by the core library, which you can style:

-   `.force-hoverable`: Always present on elements with `appHoverable` directive.
-   `.force-hover`: Added when the virtual cursor is hovering over the element.

For the virtual cursor itself, you can style the `.force-cursor` and `.force-loading` classes. Refer to the `@theforce/core` documentation for more details.
