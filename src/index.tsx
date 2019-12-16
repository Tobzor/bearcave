// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
// Locals
import AppWrapper from "./AppWrapper";

// will initialize the wrapper that renders each app.
const start = async () => {
    const Root = () => {
        const overlay = useRef(null);
        const bearcaveContext = {};

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
    .catch(e => console.error(e));
