// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
// Locals
import AppWrapper from "./AppWrapper";
import { BearcaveRoot, BearcaveContent, BearcaveNav } from "@components";
import { BearcaveContext, createBearcave } from "@utils";

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
                    <BearcaveNav />
                    <BearcaveContent>
                        <AppWrapper />
                    </BearcaveContent>
                </BearcaveRoot>
            </BearcaveContext.Provider>
        );
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
