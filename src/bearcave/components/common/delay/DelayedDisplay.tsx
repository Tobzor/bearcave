import { useEffectAsync } from "@utils";
import { useState } from "react";

type DelayedDisplayProps = {
    children: React.ReactNode;
    /**
     * ms to delay rendering
     */
    delay?: number;
};
export function DelayedDisplay({
    children,
    delay = 1000,
}: DelayedDisplayProps) {
    const [show, setShow] = useState(false);

    useEffectAsync(async (signal) => {
        const timeout = setTimeout(() => {
            if (!signal.aborted) setShow(true);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    if (show) {
        return children;
    } else {
        return null;
    }
}
