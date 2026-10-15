import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeTimeOffset,
  clampTargetTime,
  calculateNewTargetTime,
  DEFAULT_SCRUB_SENSITIVITY,
} from './scrub.ts';

test('computeTimeOffset calculates proportional time offset based on sensitivity and screen width', () => {
  // Screen width: 1000, delta: 100 (10% of screen), duration: 20s, sensitivity: 0.8
  // expected offset: (100 / 1000) * 0.8 * 20 = 0.1 * 16 = 1.6s
  const offset = computeTimeOffset(100, 1000, 20, DEFAULT_SCRUB_SENSITIVITY);
  assert.equal(Math.round(offset * 100) / 100, 1.6);

  // Negative delta (moving left)
  const negOffset = computeTimeOffset(-50, 1000, 20, DEFAULT_SCRUB_SENSITIVITY);
  assert.equal(Math.round(negOffset * 100) / 100, -0.8);

  // Invalid or zero width/duration
  assert.equal(computeTimeOffset(50, 0, 20), 0);
  assert.equal(computeTimeOffset(50, 1000, 0), 0);
});

test('clampTargetTime clamps value between 0 and duration', () => {
  assert.equal(clampTargetTime(-5, 10), 0);
  assert.equal(clampTargetTime(4.5, 10), 4.5);
  assert.equal(clampTargetTime(12, 10), 10);
  assert.equal(clampTargetTime(0, 10), 0);
  assert.equal(clampTargetTime(10, 10), 10);
  assert.equal(clampTargetTime(NaN, 10), 0);
});

test('calculateNewTargetTime accumulates and clamps time correctly', () => {
  const duration = 10;
  const innerWidth = 1000;
  // Start at 5.0, move right by 250px -> (250/1000)*0.8*10 = 0.25 * 8 = 2.0s
  const newTime = calculateNewTargetTime(5.0, 250, innerWidth, duration, 0.8);
  assert.equal(newTime, 7.0);

  // Exceeding upper bound
  const clampedMax = calculateNewTargetTime(9.0, 500, innerWidth, duration, 0.8);
  assert.equal(clampedMax, 10.0);

  // Exceeding lower bound
  const clampedMin = calculateNewTargetTime(1.0, -500, innerWidth, duration, 0.8);
  assert.equal(clampedMin, 0.0);
});
