/**
 * Typewriter logic utility
 */

export interface TypewriterState {
  displayed: string;
  done: boolean;
  currentIndex: number;
}

export function getInitialTypewriterState(): TypewriterState {
  return {
    displayed: '',
    done: false,
    currentIndex: 0,
  };
}

export function advanceTypewriter(
  fullText: string,
  currentIndex: number
): TypewriterState {
  if (!fullText) {
    return {
      displayed: '',
      done: true,
      currentIndex: 0,
    };
  }

  const nextIndex = Math.min(currentIndex + 1, fullText.length);
  const displayed = fullText.slice(0, nextIndex);
  const done = nextIndex >= fullText.length;

  return {
    displayed,
    done,
    currentIndex: nextIndex,
  };
}
