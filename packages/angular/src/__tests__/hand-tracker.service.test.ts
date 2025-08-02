import { HandTrackerService } from '../lib/hand-tracker.service';

// Mock the core HandTracker
jest.mock('@theforce/core', () => ({
  HandTracker: jest.fn().mockImplementation(() => ({
    onResults: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

// Mock NgZone
jest.mock('@angular/core', () => ({
  Injectable: jest.fn(),
  NgZone: jest.fn().mockImplementation(() => ({
    run: jest.fn((fn) => fn()),
  })),
  OnDestroy: jest.fn(),
}));

describe('HandTrackerService', () => {
  let service: HandTrackerService;

  beforeEach(() => {
    service = new HandTrackerService({} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have handLandmarks$ observable', () => {
    expect(service.handLandmarks$).toBeDefined();
  });

  it('should have tracking property', () => {
    expect(service.tracking).toBeDefined();
  });
}); 