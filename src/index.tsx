// Deps
import React, { useRef } from "react";
import { Router } from "react-router";
import { render } from "react-dom";
// Locals
import { BearcaveContext, createBearcave } from "@utils";
import { BearcaveRoot } from "@components";
import AppRenderer from "./AppRenderer";

// will initialize the wrapper that renders each app.
async function start(): Promise<void> {
    // TODO: handle authentication if necessary.
    function Root(): JSX.Element {
        const overlay = useRef(null);
        const root = useRef(null);
        const bearcaveContext = createBearcave({ root, overlay });

        return (
            <Router history={bearcaveContext.history}>
                <BearcaveContext.Provider value={bearcaveContext}>
                    <BearcaveRoot root={root} overlay={overlay}>
                        <AppRenderer />
                    </BearcaveRoot>
                </BearcaveContext.Provider>
            </Router>
        );
    }

    render(<Root />, document.getElementById("root"));
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
