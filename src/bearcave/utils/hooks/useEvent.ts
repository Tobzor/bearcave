import { useEffect, useRef } from "react";

export function useEvent(
    eventName: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
    element: typeof globalThis | typeof document | Element = globalThis,
): void {
    // Create a ref that stores handler
    const savedHandler = useRef<EventListener>();
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
            const eventListener: EventListener = (event) =>
                savedHandler.current && savedHandler.current(event);
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
