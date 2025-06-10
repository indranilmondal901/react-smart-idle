import { useRef, useEffect } from 'react';

function useSmartIdle({ timeout, onIdle, onActive, events = ['mousemove', 'keydown', 'scroll'], }) {
    const timer = useRef(0); //Holds the setTimeout() ID.
    const isIdle = useRef(false); //Tracks the user’s idle state.
    //This function runs every time an activity is detected
    const resetTimer = () => {
        if (timer.current) {
            window.clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(() => {
            isIdle.current = true;
            onIdle();
        }, timeout);
        if (isIdle.current) {
            isIdle.current = false;
            onActive === null || onActive === void 0 ? void 0 : onActive();
        }
    };
    useEffect(() => {
        events.forEach(e => window.addEventListener(e, resetTimer)); // Attach event listeners : if any of the specified events occur, reset the timer.
        resetTimer(); // initialize timer immediately -Starts the first timer as soon as the component mounts.
        return () => {
            if (timer.current)
                window.clearTimeout(timer.current);
            events.forEach(e => window.removeEventListener(e, resetTimer));
        };
    }, []);
}

export { useSmartIdle };
//# sourceMappingURL=index.esm.js.map
