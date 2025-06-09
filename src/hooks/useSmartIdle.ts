import { useEffect, useRef } from 'react';

export interface UseSmartIdleOptions {
  timeout: number;
  onIdle: () => void;
  onActive?: () => void;
  events?: string[];
}

export function useSmartIdle({
  timeout,
  onIdle,
  onActive,
  events = ['mousemove', 'keydown', 'scroll'],
}: UseSmartIdleOptions) {
  const timer = useRef<number>(0);//Holds the setTimeout() ID.
  const isIdle = useRef(false);//Tracks the user’s idle state.

  //This function runs every time an activity is detected
  const resetTimer = () => {
    if (timer.current) {
      window.clearTimeout(timer.current)
    };
    
    timer.current = window.setTimeout(() => {
      isIdle.current = true;
      onIdle();
    }, timeout);

    if (isIdle.current) {
      isIdle.current = false;
      onActive?.();
    }
  };

  useEffect(() => {
    events.forEach(e => window.addEventListener(e, resetTimer));// Attach event listeners : if any of the specified events occur, reset the timer.
    resetTimer(); // initialize timer immediately -Starts the first timer as soon as the component mounts.
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, []);
}
