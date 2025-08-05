import { HandTracker } from '../hand-tracker';
import { HandTrackerConfig } from '../types';
import { getCursorScreenCoordinates } from '../utils';
import { Hands } from '@mediapipe/hands';

// Mock MediaPipe Camera
jest.mock('@mediapipe/camera_utils', () => ({
  Camera: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

// Mock MediaPipe Hands with externally accessible mock functions
const mockOnResults = jest.fn();
const mockSetOptions = jest.fn();
const mockSend = jest.fn();

jest.mock('@mediapipe/hands', () => ({
  Hands: jest.fn().mockImplementation(() => ({
    onResults: mockOnResults,
    setOptions: mockSetOptions,
    send: mockSend,
  })),
}));

// Mock document.elementFromPoint
document.elementFromPoint = jest.fn();

// Helper to create a full array of mock landmarks
const createMockLandmarks = (length = 21) =>
  Array.from({ length }, (_, i) => ({
    x: 0.05 * i,
    y: 0.05 * i,
    z: 0.05 * i,
  }));

describe('HandTracker', () => {
  let tracker: HandTracker;

  const getOnResultsCallback = () => {
    if (!mockOnResults.mock.calls.length) {
      throw new Error('onResults was not called on the Hands mock');
    }
    return mockOnResults.mock.calls[mockOnResults.mock.calls.length - 1][0];
  };

  beforeEach(() => {
    // Clear all mocks before each test
    mockOnResults.mockClear();
    mockSetOptions.mockClear();
    mockSend.mockClear();
    (Hands as jest.Mock).mockClear();
    (document.elementFromPoint as jest.Mock).mockClear();

    document.body.innerHTML = '';
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });
    jest.useFakeTimers();
  });

  afterEach(async () => {
    if (tracker) {
      await tracker.stop();
    }
    document.body.innerHTML = '';
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a HandTracker instance with default config', () => {
      tracker = new HandTracker();
      expect(tracker).toBeInstanceOf(HandTracker);
      expect(Hands).toHaveBeenCalledTimes(1);
    });

    it('should create a HandTracker instance with custom config', () => {
      const config: HandTrackerConfig = {
        hoverDelay: 2000,
        cursorImageUrl: '/custom-cursor.png',
        debug: true,
        cursorLandmarkIndex: 9,
      };
      tracker = new HandTracker(config);
      expect(tracker).toBeInstanceOf(HandTracker);
      expect(Hands).toHaveBeenCalledTimes(1);
    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      tracker = new HandTracker();
    });

    it('should initialize the tracker and create cursor element', async () => {
      await tracker.initialize();
      const cursorElement = document.querySelector('div[style*="position: fixed"]');
      expect(cursorElement).toBeTruthy();
    });

    it('should update cursor position based on landmarks', async () => {
      await tracker.initialize();
      const onResultsCallback = getOnResultsCallback();
      const mockLandmarks = createMockLandmarks();
      const cursorLandmark = mockLandmarks[9]; // Default landmark index is 9
      onResultsCallback({ multiHandLandmarks: [mockLandmarks] });
      const cursorElement = document.querySelector('div[style*="position: fixed"]') as HTMLElement;
      const expectedPosition = getCursorScreenCoordinates(cursorLandmark, {});
      expect(cursorElement.style.left).toBe(`${expectedPosition.x}px`);
      expect(cursorElement.style.top).toBe(`${expectedPosition.y}px`);
    });

    it('should detect hoverable elements', async () => {
      await tracker.initialize();
      const onResultsCallback = getOnResultsCallback();
      const hoverableElement = document.createElement('div');
      hoverableElement.setAttribute('data-hoverable', 'true');
      document.body.appendChild(hoverableElement);
      (document.elementFromPoint as jest.Mock).mockReturnValue(hoverableElement);
      const mockLandmarks = createMockLandmarks();
      mockLandmarks[9] = { x: 0.5, y: 0.5, z: 0 }; // Position cursor over the element
      onResultsCallback({ multiHandLandmarks: [mockLandmarks] });
      expect(hoverableElement.classList.contains('force-hover')).toBe(true);
    });

    it('should use custom hover delay', async () => {
      tracker = new HandTracker({ hoverDelay: 500 });
      await tracker.initialize();
      const onResultsCallback = getOnResultsCallback();
      const hoverableElement = document.createElement('div');
      hoverableElement.setAttribute('data-hoverable', 'true');
      document.body.appendChild(hoverableElement);
      (document.elementFromPoint as jest.Mock).mockReturnValue(hoverableElement);
      const mockLandmarks = createMockLandmarks();
      mockLandmarks[9] = { x: 0.5, y: 0.5, z: 0 }; // Position cursor over the element
      onResultsCallback({ multiHandLandmarks: [mockLandmarks] });
      jest.advanceTimersByTime(500);
      expect(hoverableElement.classList.contains('force-hover')).toBe(true);
    });

    it('should use custom cursor landmark index', async () => {
      tracker = new HandTracker({ cursorLandmarkIndex: 8 });
      await tracker.initialize();
      const onResultsCallback = getOnResultsCallback();
      const mockLandmarks = createMockLandmarks();
      const cursorLandmark = mockLandmarks[8]; // Use landmark 8
      (document.elementFromPoint as jest.Mock).mockReturnValue(document.createElement('div'));
      onResultsCallback({ multiHandLandmarks: [mockLandmarks] });
      const cursorElement = document.querySelector('div[style*="position: fixed"]') as HTMLElement;
      const expectedPosition = getCursorScreenCoordinates(cursorLandmark, {});
      expect(cursorElement.style.left).toBe(`${expectedPosition.x}px`);
      expect(cursorElement.style.top).toBe(`${expectedPosition.y}px`);
    });
  });
});