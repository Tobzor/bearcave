import { useEvent } from "@utils";

/**
 * Handles the installation prompt, and provides a popup? with install button.
 */
export function usePWA(): void {
    useEvent("beforeinstall", (e) => {});
}
