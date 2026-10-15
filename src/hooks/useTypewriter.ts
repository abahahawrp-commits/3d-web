import { useState, useEffect } from 'react';
import { advanceTypewriter, getInitialTypewriterState } from '../utils/typewriterLogic';

export interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
}

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [state, setState] = useState(getInitialTypewriterState);

  useEffect(() => {
    setState(getInitialTypewriterState());

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const delayTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setState((prev) => {
          if (prev.done || prev.currentIndex >= text.length) {
            if (intervalId) clearInterval(intervalId);
            return { ...prev, done: true };
          }
          const next = advanceTypewriter(text, prev.currentIndex);
          if (next.done && intervalId) {
            clearInterval(intervalId);
          }
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed: state.displayed, done: state.done };
}
