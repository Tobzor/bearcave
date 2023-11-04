import { useState } from "react";

import { useEffectAsync } from "./useEffectAsync";

type PromiseLike<T> = () => Promise<T>;
type Loading = boolean;
type Error = unknown;

export function useAwait<T>(
    promiseLike: PromiseLike<T>,
): [T | undefined, Loading, Error] {
    const [state, setState] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    useEffectAsync(
        async (signal) => {
            try {
                if (!signal.aborted) {
                    setIsLoading(true);
                }

                const data = await promiseLike();

                if (!signal.aborted) {
                    setState(data);
                }
            } catch (error) {
                console.warn("Failed to fetch: ", error);
                if (!signal.aborted) {
                    setError(error);
                }
            } finally {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [promiseLike],
    );

    return [state, isLoading, error];
}
