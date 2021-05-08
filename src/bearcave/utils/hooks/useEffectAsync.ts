import React, { useEffect } from "react";

type AsyncEffect = (signal: AbortSignal) => Promise<void | (() => void)>;
export function useEffectAsync(
    effect: AsyncEffect,
    deps: React.DependencyList = [],
): void {
    useEffect(() => {
        const abortController = new AbortController();

        const cleanupPromise = effect(abortController.signal);

        return () => {
            cleanupPromise.then((cleanup) => {
                abortController.abort();
                cleanup && cleanup();
            });
        };
    }, deps);
}
