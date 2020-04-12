// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
// Locals
import AppWrapper from "./AppWrapper";
import { createBearcave } from "@utils";

// will initialize the wrapper that renders each app.
const start = async () => {
    // TODO: handle authentication if necessary.
    const Root = () => {
        const overlay = useRef(null);
        const bearcaveContext = createBearcave({ overlay });

        return (
            <>
                <AppWrapper />
                <div id="overlay-root" ref={overlay}>
                    {/* overlays, modals, notifications, tooltips and popovers */}
                </div>
            </>
        );
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
