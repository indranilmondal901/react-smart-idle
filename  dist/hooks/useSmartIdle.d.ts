export interface UseSmartIdleOptions {
    timeout: number;
    onIdle: () => void;
    onActive?: () => void;
    events?: string[];
}
export declare function useSmartIdle({ timeout, onIdle, onActive, events, }: UseSmartIdleOptions): void;
