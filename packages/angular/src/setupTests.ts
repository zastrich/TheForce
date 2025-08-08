// Mock MediaPipe dependencies
jest.mock("@mediapipe/hands", () => ({
  Hands: jest.fn().mockImplementation(() => ({
    setOptions: jest.fn(),
    onResults: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
  })),
}));

jest.mock("@mediapipe/camera_utils", () => ({
  Camera: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

// Mock DOM APIs
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1920,
});

Object.defineProperty(window, "innerHeight", {
  writable: true,
  configurable: true,
  value: 1080,
});

// Mock document.elementsFromPoint
document.elementsFromPoint = jest.fn().mockReturnValue([]);

// Mock HTMLVideoElement
Object.defineProperty(window.HTMLVideoElement.prototype, "play", {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

Object.defineProperty(window.HTMLVideoElement.prototype, "pause", {
  writable: true,
  configurable: true,
  value: jest.fn(),
});
