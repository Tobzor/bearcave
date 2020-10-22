// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
// Locals
import { BearcaveContext, createBearcave } from "@utils";

import { BearcaveRoot } from "@components";
import BearcaveApps from "@apps";

// will initialize the wrapper that renders each app.
const start = async (): Promise<void> => {
    // TODO: handle authentication if necessary.
    const Root = (): JSX.Element => {
        const overlay = useRef(null);
        const root = useRef(null);
        const bearcaveContext = createBearcave({ root, overlay });

        return (
            <BearcaveContext.Provider value={bearcaveContext}>
                <BearcaveRoot root={root} overlay={overlay}>
                    <BearcaveApps />
                </BearcaveRoot>
            </BearcaveContext.Provider>
        );
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
