export interface HandTrackerConfig {
  /**
   * The path to the hand tracking model.
   */
  modelPath?: string;
  /**
   * The minimum confidence score for a hand to be detected.
   */
  minDetectionConfidence?: number;
  /**
   * The minimum confidence score for the hand landmarks to be tracked.
   */
  minTrackingConfidence?: number;
  /**
   * The maximum number of hands to detect.
   */
  maxNumHands?: number;
  /**
   * If true, the video feed will be displayed in the bottom right corner for debugging.
   */
  debug?: boolean;
  /**
   * The delay in milliseconds before a hover action triggers a click.
   */
  hoverDelay?: number;
  /**
   * The sensitivity of the cursor movement along the X-axis.
   */
  sensitivityX?: number;
  /**
   * The sensitivity of the cursor movement along the Y-axis.
   */
  sensitivityY?: number;
  /**
   * The URL of an image to use as the cursor.
   */
  cursorImageUrl?: string;
  /**
   * The index of the landmark to use for cursor positioning (e.g., 0 for wrist, 8 for index finger tip, 9 for middle finger base).
   * Defaults to 9 (middle finger base) for a more central hand tracking experience.
   */
  cursorLandmarkIndex?: number;
}

export interface HandTrackerResults {
  multiHandLandmarks: any[][];
  multiHandedness?: any[];
}

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}
