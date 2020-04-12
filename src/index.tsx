// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
// Locals
import AppWrapper from "./AppWrapper";
import { BearcaveContext, createBearcave } from "@utils";

// will initialize the wrapper that renders each app.
const start = async (): Promise<void> => {
    // TODO: handle authentication if necessary.
    const Root = (): JSX.Element => {
        const overlay = useRef(null);
        const bearcaveContext = createBearcave({ overlay });

        return (
            <BearcaveContext.Provider value={bearcaveContext}>
                <AppWrapper />
                <div id="overlay-root" ref={overlay}>
                    {/* overlays, modals, notifications, tooltips and popovers */}
                </div>
            </BearcaveContext.Provider>
        );
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
