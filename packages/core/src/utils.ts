export const getCursorScreenCoordinates = (
  landmark: any,
  config: { sensitivityX?: number; sensitivityY?: number }
): { x: number; y: number } => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Normalize landmark.x and y to be from -0.5 to 0.5 (centered)
  // landmark.x is 0 (right) to 1 (left), so (0.5 - landmark.x) flips and centers it
  const normalizedXFromCenter = (0.5 - landmark.x);
  const normalizedYFromCenter = (landmark.y - 0.5);

  // Apply sensitivity to the normalized distance from center
  const scaledXFromCenter = normalizedXFromCenter * (config.sensitivityX || 1);
  const scaledYFromCenter = normalizedYFromCenter * (config.sensitivityY || 1);

  // Clamp the scaled values to ensure the cursor stays within screen bounds (normalized -0.5 to 0.5)
  const clampedScaledX = Math.max(-0.5, Math.min(0.5, scaledXFromCenter));
  const clampedScaledY = Math.max(-0.5, Math.min(0.5, scaledYFromCenter));

  // Map the clamped, scaled normalized values to screen coordinates
  const x = centerX + (clampedScaledX * window.innerWidth);
  const y = centerY + (clampedScaledY * window.innerHeight);

  return { x, y };
}