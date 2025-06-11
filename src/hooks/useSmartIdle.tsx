import { useEffect, useRef } from "react";

export interface UseSmartIdleOptions {
  timeout: number;
  onIdle: () => void;
  onActive?: () => void;
  events?: string[];
}

const useSmartIdle = ({
  timeout,
  onIdle,
  onActive,
  events = ["mousemove", "keydown", "scroll"],
}: UseSmartIdleOptions) => {
  const timer = useRef<number | null>(null); // Holds the setTimeout() ID
  const isIdle = useRef(false); // Tracks the user’s idle state

  const resetTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);

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
    if (typeof window === 'undefined') return;
    
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Initialize immediately on mount

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);
};

export default useSmartIdle;
