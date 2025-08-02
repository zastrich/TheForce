// Mock MediaPipe dependencies
jest.mock('@mediapipe/hands', () => ({
  Hands: jest.fn().mockImplementation(() => ({
    setOptions: jest.fn(),
    onResults: jest.fn(),
    send: jest.fn(),
  })),
}));

jest.mock('@mediapipe/camera_utils', () => ({
  Camera: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

jest.mock('@mediapipe/drawing_utils', () => ({
  DrawingUtils: jest.fn(),
}));

// Mock DOM APIs
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock elementFromPoint
document.elementFromPoint = jest.fn();

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 0);
  return 1;
});

// Mock setTimeout
global.setTimeout = jest.fn((callback, delay) => {
  return setTimeout(callback, delay);
});

// Mock clearTimeout
global.clearTimeout = jest.fn((id) => {
  clearTimeout(id);
}); 