// Deps
import React, { useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Locals
import { BearcaveContext, createBearcave } from "@utils";
import { Bearcave, AppRenderer } from "@components";
import Home from "./homepage";

function Root(): JSX.Element {
    const overlay = useRef(null);
    const root = useRef(null);
    const bearcaveContext = createBearcave({ root, overlay });

    return (
        <BrowserRouter>
            <BearcaveContext.Provider value={bearcaveContext}>
                <Bearcave root={root} overlay={overlay}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="apps/*" element={<AppRenderer />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Bearcave>
            </BearcaveContext.Provider>
        </BrowserRouter>
    );
}

function PageNotFound() {
    return <div>Could not find the requested page.</div>;
}

async function start(): Promise<void> {
    render(<Root />, document.getElementById("root"));
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
