import { useHandTracker } from "../use-hand-tracker";

// Mock the core HandTracker
jest.mock("@theforce/core", () => ({
  HandTracker: jest.fn().mockImplementation(() => ({
    onResults: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

describe("useHandTracker", () => {
  it("should initialize with custom config", async () => {
    const config = { hoverDelay: 2000 };
    const { handLandmarks, isTracking, initialize, stop } =
      useHandTracker(config);

    expect(handLandmarks.value).toEqual([]);
    expect(isTracking.value).toBe(false);
    expect(typeof initialize).toBe("function");
    expect(typeof stop).toBe("function");
  });

  it("should handle stop functionality", async () => {
    const { isTracking, stop } = useHandTracker();

    // Initially should be false
    expect(isTracking.value).toBe(false);

    await stop();

    // Should still be false after stop
    expect(isTracking.value).toBe(false);
  });

  it("should handle restart functionality", async () => {
    const { isTracking, restart } = useHandTracker();
    const mockVideoElement = document.createElement("video");

    // Initially should be false
    expect(isTracking.value).toBe(false);

    await restart(mockVideoElement);

    // Should be true after restart
    expect(isTracking.value).toBe(true);
  });

  it("should provide hand tracker functionality", () => {
    const { handLandmarks, isTracking, initialize, stop, restart } =
      useHandTracker();

    expect(handLandmarks.value).toEqual([]);
    expect(isTracking.value).toBe(false);
    expect(typeof initialize).toBe("function");
    expect(typeof stop).toBe("function");
    expect(typeof restart).toBe("function");
  });
});
