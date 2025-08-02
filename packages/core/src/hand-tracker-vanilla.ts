import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export interface HandTrackerVanillaOptions {
  hoverDelay?: number;
  cursorImageUrl?: string;
  cursorElement?: HTMLElement;
  videoElement?: HTMLVideoElement;
}

export class HandTrackerVanilla {
  private hands: Hands;
  private camera: Camera | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private cursorElement: HTMLElement;
  private activeTargets: Map<HTMLElement, number> = new Map();
  private options: HandTrackerVanillaOptions;

  constructor(options: HandTrackerVanillaOptions = {}) {
    this.options = {
      hoverDelay: 1000,
      ...options
    };

    // Initialize MediaPipe Hands
    this.hands = new Hands({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    // Create cursor element if not provided
    if (options.cursorElement) {
      this.cursorElement = options.cursorElement;
    } else {
      this.cursorElement = document.createElement('div');
      this.cursorElement.style.position = 'fixed';
      this.cursorElement.style.pointerEvents = 'none';
      this.cursorElement.style.width = '20px';
      this.cursorElement.style.height = '20px';
      this.cursorElement.style.backgroundSize = 'contain';
      this.cursorElement.style.backgroundRepeat = 'no-repeat';
      this.cursorElement.style.zIndex = '9999';
      
      if (options.cursorImageUrl) {
        this.cursorElement.style.backgroundImage = `url(${options.cursorImageUrl})`;
      } else {
        this.cursorElement.style.backgroundColor = 'red';
        this.cursorElement.style.borderRadius = '50%';
        this.cursorElement.style.opacity = '0.5';
      }
      
      document.body.appendChild(this.cursorElement);
    }

    // Bind methods
    this.onResults = this.onResults.bind(this);
  }

  public async initialize(videoElement?: HTMLVideoElement): Promise<void> {
    this.videoElement = videoElement || document.createElement('video');
    
    if (!this.videoElement.parentElement) {
      this.videoElement.style.display = 'none';
      document.body.appendChild(this.videoElement);
    }

    this.hands.onResults(this.onResults);

    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement! });
      },
      width: 1280,
      height: 720
    });

    if (!this.camera) {
      throw new Error('Failed to initialize camera');
    }

    await this.camera.start();
  }

  private onResults(results: any): void {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const indexFinger = results.multiHandLandmarks[0][8]; // Index fingertip
      
      // Convert normalized coordinates to screen coordinates
      const x = indexFinger.x * window.innerWidth;
      const y = indexFinger.y * window.innerHeight;

      // Update cursor position
      this.cursorElement.style.transform = `translate(${x}px, ${y}px)`;

      // Check for hoverable elements
      this.checkHoverableElements(x, y);
    }
  }

  private checkHoverableElements(x: number, y: number): void {
    const elements = document.elementsFromPoint(x, y);
    const hoverableElements = elements.filter(el => 
      el instanceof HTMLElement && el.classList.contains('force-hoverable')
    ) as HTMLElement[];

    // Update hover timers
    for (const element of hoverableElements) {
      if (!this.activeTargets.has(element)) {
        this.activeTargets.set(element, Date.now());
        element.classList.add('force-hover');
      } else {
        const hoverStartTime = this.activeTargets.get(element)!;
        const hoverDuration = Date.now() - hoverStartTime;

        if (hoverDuration >= this.options.hoverDelay!) {
          this.triggerClick(element);
          this.activeTargets.delete(element);
          element.classList.remove('force-hover');
        }
      }
    }

    // Clean up elements that are no longer being hovered
    for (const [element] of this.activeTargets) {
      if (!hoverableElements.includes(element)) {
        this.activeTargets.delete(element);
        element.classList.remove('force-hover');
      }
    }
  }

  private triggerClick(element: HTMLElement): void {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(clickEvent);
  }

  public destroy(): void {
    if (this.camera) {
      this.camera.stop();
    }
    this.hands.close();
    if (this.cursorElement.parentElement) {
      this.cursorElement.parentElement.removeChild(this.cursorElement);
    }
    if (this.videoElement && !this.options.videoElement) {
      this.videoElement.parentElement?.removeChild(this.videoElement);
    }
  }
} 