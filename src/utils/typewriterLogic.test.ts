import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceTypewriter,
  getInitialTypewriterState,
} from './typewriterLogic.ts';

test('getInitialTypewriterState returns empty text and false done flag', () => {
  const init = getInitialTypewriterState();
  assert.equal(init.displayed, '');
  assert.equal(init.done, false);
  assert.equal(init.currentIndex, 0);
});

test('advanceTypewriter reveals one character per step and completes at full text', () => {
  const text = 'Hey';
  let state = getInitialTypewriterState();

  state = advanceTypewriter(text, state.currentIndex);
  assert.equal(state.displayed, 'H');
  assert.equal(state.done, false);
  assert.equal(state.currentIndex, 1);

  state = advanceTypewriter(text, state.currentIndex);
  assert.equal(state.displayed, 'He');
  assert.equal(state.done, false);
  assert.equal(state.currentIndex, 2);

  state = advanceTypewriter(text, state.currentIndex);
  assert.equal(state.displayed, 'Hey');
  assert.equal(state.done, true);
  assert.equal(state.currentIndex, 3);

  // Calling again keeps it at end
  state = advanceTypewriter(text, state.currentIndex);
  assert.equal(state.displayed, 'Hey');
  assert.equal(state.done, true);
});
