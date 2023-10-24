import { useEffect } from "react";

function useDocumentTitle(newTitle: string): void {
    useEffect(() => {
        const previousTitle = document.title;

        // new title assignment
        document.title = "Bearcave | " + newTitle;

        return () => {
            document.title = previousTitle;
        };
    }, [newTitle]);
}

function ZuzuCity(): JSX.Element {
    // Set "tab" text to Bearcave | Zuzu City.
    useDocumentTitle("Zuzu City");

    return (
        <div>
            <h1>Zuzu City</h1>
            <div>
                <h4>Hello world</h4>
            </div>
        </div>
    );
}
export default ZuzuCity;
