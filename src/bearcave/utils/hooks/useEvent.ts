import { useEffect, useRef } from "react";

type Listener<K extends keyof HTMLElementEventMap> = (
    e: HTMLElementEventMap[K],
) => void;
export function useEvent<K extends keyof HTMLElementEventMap>(
    eventName: K,
    listener: Listener<K>,
    options?: boolean | AddEventListenerOptions,
    element: typeof globalThis | typeof document | Element = globalThis,
): void {
    // Create a ref that stores handler
    const savedHandler = useRef<Listener<K>>();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = listener;
    }, [listener]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;
            // Create event listener that calls handler function stored in ref
            const eventListener: EventListenerOrEventListenerObject = (event) =>
                savedHandler.current &&
                savedHandler.current(event as HTMLElementEventMap[K]);
            // Add event listener
            element.addEventListener(eventName, eventListener, options);
            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element], // Re-run if eventName or element changes
    );
}
