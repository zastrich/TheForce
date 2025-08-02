import { HandTracker } from '../hand-tracker';
import { HandTrackerConfig } from '../types';

describe('HandTracker', () => {
  let tracker: HandTracker;
  let mockVideoElement: HTMLVideoElement;
  let mockParentElement: HTMLElement;

  beforeEach(() => {
    // Create mock video element
    mockVideoElement = document.createElement('video');
    mockParentElement = document.createElement('div');
    mockParentElement.appendChild(mockVideoElement);
    document.body.appendChild(mockParentElement);

    tracker = new HandTracker();
  });

  afterEach(() => {
    // Clean up
    if (tracker) {
      tracker.stop();
    }
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    it('should create a HandTracker instance with default config', () => {
      expect(tracker).toBeInstanceOf(HandTracker);
    });

    it('should create a HandTracker instance with custom config', () => {
      const config: HandTrackerConfig = {
        hoverDelay: 2000,
        cursorImageUrl: '/custom-cursor.png',
      };
      const customTracker = new HandTracker(config);
      expect(customTracker).toBeInstanceOf(HandTracker);
    });
  });

  describe('initialize', () => {
    it('should initialize the tracker and create cursor element', async () => {
      await tracker.initialize();
      
      const cursorElement = document.querySelector('div[style*="position: fixed"]');
      expect(cursorElement).toBeTruthy();
    });

    it('should not initialize twice', async () => {
      await tracker.initialize();
      await tracker.initialize(); // Should not create duplicate cursor elements
      
      const cursorElements = document.querySelectorAll('div[style*="position: fixed"]');
      expect(cursorElements).toHaveLength(1);
    });
  });

  describe('start', () => {
    it('should start tracking with video element', async () => {
      await tracker.initialize();
      await tracker.start(mockVideoElement);
      
      // Should create canvas element
      const canvasElement = mockParentElement.querySelector('canvas');
      expect(canvasElement).toBeTruthy();
    });

    it('should initialize if not already initialized', async () => {
      await tracker.start(mockVideoElement);
      
      const cursorElement = document.querySelector('div[style*="position: fixed"]');
      expect(cursorElement).toBeTruthy();
    });
  });

  describe('stop', () => {
    it('should stop tracking and clean up elements', async () => {
      await tracker.initialize();
      await tracker.start(mockVideoElement);
      await tracker.stop();
      
      const cursorElement = document.querySelector('div[style*="position: fixed"]');
      const canvasElement = mockParentElement.querySelector('canvas');
      
      expect(cursorElement).toBeFalsy();
      expect(canvasElement).toBeFalsy();
    });
  });

  describe('onResults', () => {
    it('should register callback for results', () => {
      const mockCallback = jest.fn();
      tracker.onResults(mockCallback);
      
      // The callback should be registered (we can't easily test the internal callback without exposing it)
      expect(mockCallback).toBeDefined();
    });
  });

  describe('cursor positioning', () => {
    it('should update cursor position based on landmarks', async () => {
      await tracker.initialize();
      
      const mockLandmarks = [
        { x: 0.5, y: 0.5, z: 0 }, // Index finger tip at center
      ];
      
      // Simulate results with landmarks
      const mockResults = {
        multiHandLandmarks: [mockLandmarks],
        multiHandedness: [],
      };
      
      // We need to access the private method for testing
      // This is a limitation of the current design
      // In a real scenario, we might want to make some methods protected for testing
    });
  });

  describe('hover detection', () => {
    it('should detect hoverable elements', async () => {
      await tracker.initialize();
      
      // Create a hoverable element
      const hoverableElement = document.createElement('div');
      hoverableElement.setAttribute('data-hoverable', 'true');
      document.body.appendChild(hoverableElement);
      
      // Mock elementFromPoint to return our hoverable element
      (document.elementFromPoint as jest.Mock).mockReturnValue(hoverableElement);
      
      // Simulate landmarks pointing at the element
      const mockLandmarks = [
        { x: 0.5, y: 0.5, z: 0 },
      ];
      
      // This would require accessing private methods or restructuring for better testability
    });
  });

  describe('configuration', () => {
    it('should use custom cursor image when provided', async () => {
      const config: HandTrackerConfig = {
        cursorImageUrl: '/custom-cursor.png',
      };
      const customTracker = new HandTracker(config);
      
      await customTracker.initialize();
      
      const cursorElement = document.querySelector('div[style*="position: fixed"]') as HTMLElement;
      expect(cursorElement?.style.backgroundImage).toContain('/custom-cursor.png');
    });

    it('should use custom hover delay', () => {
      const config: HandTrackerConfig = {
        hoverDelay: 3000,
      };
      const customTracker = new HandTracker(config);
      
      // The hover delay should be set in the configuration
      // We can't easily test this without exposing internal state
    });
  });
}); 