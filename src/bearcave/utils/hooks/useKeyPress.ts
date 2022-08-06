import { useState, useCallback } from "react";
import { useEvent } from "./useEvent";

export function useKeyPress(
    targetKey: string | number,
    handler?: EventListener,
): boolean {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === targetKey) {
                if (handler) {
                    handler(e);
                } else {
                    // preventing default helps stopping browser from triggering scroll events on arrowdown
                    e.preventDefault();
                    setKeyPressed(true);
                }
            }
        },
        [targetKey, handler],
    );

    const upHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === targetKey) {
                // preventing default helps stopping browser from triggering scroll events on arrowdown
                e.preventDefault();
                setKeyPressed(false);
            }
        },
        [targetKey],
    );

    useEvent("keydown", downHandler);
    useEvent("keyup", upHandler);

    return keyPressed;
}
