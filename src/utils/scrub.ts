/**
 * Video scrubbing utility functions
 */

export const DEFAULT_SCRUB_SENSITIVITY = 0.8;

/**
 * Computes the time offset in seconds based on horizontal mouse movement.
 * formula: (delta / innerWidth) * sensitivity * duration
 */
export function computeTimeOffset(
  delta: number,
  innerWidth: number,
  duration: number,
  sensitivity: number = DEFAULT_SCRUB_SENSITIVITY
): number {
  if (!innerWidth || innerWidth <= 0 || !duration || duration <= 0) {
    return 0;
  }
  return (delta / innerWidth) * sensitivity * duration;
}

/**
 * Clamps target time within the video bounds [0, duration].
 */
export function clampTargetTime(targetTime: number, duration: number): number {
  if (isNaN(targetTime)) return 0;
  if (!duration || duration <= 0) return 0;
  return Math.max(0, Math.min(duration, targetTime));
}

/**
 * Calculates new scrubbed target time given current target time, mouse delta, window width, and duration.
 */
export function calculateNewTargetTime(
  currentTargetTime: number,
  delta: number,
  innerWidth: number,
  duration: number,
  sensitivity: number = DEFAULT_SCRUB_SENSITIVITY
): number {
  const offset = computeTimeOffset(delta, innerWidth, duration, sensitivity);
  return clampTargetTime(currentTargetTime + offset, duration);
}
