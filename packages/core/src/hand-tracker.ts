import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { HandTrackerConfig, HandTrackerResults } from './types';

export class HandTracker {
  private hands: Hands;
  private camera: Camera | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private cursorElement: HTMLElement | null = null;
  private config: HandTrackerConfig;
  private onResultsCallback: ((results: HandTrackerResults) => void) | null = null;
  private hoverTimeout: NodeJS.Timeout | null = null;
  private hoveredElement: HTMLElement | null = null;
  private isInitialized = false;

  constructor(config: HandTrackerConfig = {}) {
    this.config = {
      hoverDelay: 2000,
      sensitivityX: 1,
      sensitivityY: 1,
      ...config
    };
    
    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    this.setupHands();
  }

  private setupHands(): void {
    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.hands.onResults((results) => {
      this.handleResults(results);
    });
  }

  private handleResults(results: any): void {
    if (this.onResultsCallback) {
      this.onResultsCallback(results);
    }

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      this.updateCursor(landmarks);
      this.checkHoverableElements(landmarks);
    }
  }

  private updateCursor(landmarks: any[]): void {
    if (!this.cursorElement || !landmarks || landmarks.length === 0) return;

    const indexFinger = landmarks[8]; // Index finger tip
    if (indexFinger) {
      const x = (1 - indexFinger.x) * window.innerWidth * (this.config.sensitivityX || 1);
      const y = indexFinger.y * window.innerHeight * (this.config.sensitivityY || 1);

      this.cursorElement.style.left = `${x}px`;
      this.cursorElement.style.top = `${y}px`;
      this.cursorElement.style.display = 'block';
    }
  }

  private checkHoverableElements(landmarks: any[]): void {
    if (!landmarks || landmarks.length === 0) return;

    const indexFinger = landmarks[8];
    if (!indexFinger) return;

    const x = (1 - indexFinger.x) * window.innerWidth * (this.config.sensitivityX || 1);
    const y = indexFinger.y * window.innerHeight * (this.config.sensitivityY || 1);

    const element = document.elementFromPoint(x, y) as HTMLElement;
    const hoverableElement = element?.closest('[data-hoverable]') as HTMLElement;

    if (hoverableElement && hoverableElement !== this.hoveredElement) {
      this.handleHoverStart(hoverableElement);
    } else if (!hoverableElement && this.hoveredElement) {
      this.handleHoverEnd();
    }
  }

  private handleHoverStart(element: HTMLElement): void {
    this.hoveredElement = element;
    element.classList.add('force-hover');

    if (this.cursorElement) {
      this.cursorElement.classList.add('force-loading');
      this.cursorElement.style.setProperty('--hover-delay', `${this.config.hoverDelay || 2000}ms`);
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    this.hoverTimeout = setTimeout(() => {
      this.triggerClick(element);
    }, this.config.hoverDelay || 2000);
  }

  private handleHoverEnd(): void {
    if (this.hoveredElement) {
      this.hoveredElement.classList.remove('force-hover');
      this.hoveredElement = null;
    }

    if (this.cursorElement) {
      this.cursorElement.classList.remove('force-loading');
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  private triggerClick(element: HTMLElement): void {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(event);
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Create cursor element
    this.cursorElement = document.createElement('div');
    this.cursorElement.style.position = 'fixed';
    this.cursorElement.style.pointerEvents = 'none';
    this.cursorElement.style.zIndex = '9999';
    this.cursorElement.style.display = 'none';
    this.cursorElement.style.width = '20px';
    this.cursorElement.style.height = '20px';
    this.cursorElement.style.borderRadius = '50%';
    this.cursorElement.style.backgroundColor = 'red';
    this.cursorElement.style.opacity = '0.7';
    this.cursorElement.style.transform = 'translate(-50%, -50%)';

    const style = document.createElement('style');
    style.innerHTML = `
      .force-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        opacity: 0.7;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.2s ease-out;
      }
      .force-cursor.force-loading::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 5px solid rgba(0, 0, 255, 0.5);
        border-top-color: blue;
        animation: force-spin var(--hover-delay, 2s) linear forwards;
      }
      @keyframes force-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    if (this.config.cursorImageUrl) {
      this.cursorElement.style.backgroundImage = `url(${this.config.cursorImageUrl})`;
      this.cursorElement.style.backgroundSize = 'contain';
      this.cursorElement.style.backgroundColor = 'transparent';
    }

    document.body.appendChild(this.cursorElement);

    this.isInitialized = true;
  }

  public async start(videoElement: HTMLVideoElement): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.videoElement = videoElement;

    // Create canvas for drawing
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.style.position = 'absolute';
    this.canvasElement.style.top = '0';
    this.canvasElement.style.left = '0';
    this.canvasElement.style.pointerEvents = 'none';
    this.canvasElement.style.zIndex = '1';

    if (videoElement.parentElement) {
      videoElement.parentElement.style.position = 'relative';
      videoElement.parentElement.appendChild(this.canvasElement);
    }

    this.camera = new Camera(videoElement, {
      onFrame: async () => {
        if (this.videoElement) {
          await this.hands.send({ image: this.videoElement });
        }
      },
      width: 640,
      height: 480
    });

    await this.camera.start();
  }

  public async stop(): Promise<void> {
    if (this.camera) {
      await this.camera.stop();
      this.camera = null;
    }

    if (this.cursorElement && this.cursorElement.parentElement) {
      this.cursorElement.parentElement.removeChild(this.cursorElement);
      this.cursorElement = null;
    }

    if (this.canvasElement && this.canvasElement.parentElement) {
      this.canvasElement.parentElement.removeChild(this.canvasElement);
      this.canvasElement = null;
    }

    this.handleHoverEnd();
    this.isInitialized = false;
  }

  public onResults(callback: (results: HandTrackerResults) => void): void {
    this.onResultsCallback = callback;
  }
} 