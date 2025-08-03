export interface HandTrackerConfig {
  cursorImageUrl?: string;
  actionImageUrl?: string;
  hoverDelay?: number;
  videoElement?: HTMLVideoElement;
  cursorElement?: HTMLElement;
  sensitivityX?: number;
  sensitivityY?: number;
}

export interface HandTrackerResults {
  multiHandLandmarks: any[][];
  multiHandedness: any[];
}

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
} 