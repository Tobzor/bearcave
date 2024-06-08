import { useEffect } from "react";

export function useDocumentTitle(newTitle: string): void {
    useEffect(() => {
        const previousTitle = document.title;

        // new title assignment
        document.title = "Bearcave | " + newTitle;

        return () => {
            document.title = previousTitle;
        };
    }, [newTitle]);
}
