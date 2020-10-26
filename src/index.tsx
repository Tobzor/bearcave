// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
// Locals
import { BearcaveContext, createBearcave } from "@utils";
import { Bearcave } from "@components";
import AppRenderer from "./AppRenderer";

function Root(): JSX.Element {
    const overlay = useRef(null);
    const root = useRef(null);
    const bearcaveContext = createBearcave({ root, overlay });

    return (
        <BrowserRouter>
            <BearcaveContext.Provider value={bearcaveContext}>
                <Bearcave root={root} overlay={overlay}>
                    <AppRenderer />
                </Bearcave>
            </BearcaveContext.Provider>
        </BrowserRouter>
    );
}

async function start(): Promise<void> {
    render(<Root />, document.getElementById("root"));
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
