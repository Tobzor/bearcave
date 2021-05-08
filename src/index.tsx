// Deps
import React, { Suspense, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Locals
import { BearcaveContext, createBearcave } from "@utils";
import { Bearcave, AppRenderer } from "@components";

import Home from "./homepage";

function Root(): JSX.Element {
    const dialog = useRef(null);
    const root = useRef(null);
    const bearcaveContext = createBearcave({ root, dialog });

    return (
        <BearcaveContext.Provider value={bearcaveContext}>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Bearcave root={root} dialog={dialog}>
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="apps/*" element={<AppRenderer />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Bearcave>
                </Router>
            </Suspense>
        </BearcaveContext.Provider>
    );
}

function PageNotFound() {
    return <div>Could not find the requested page.</div>;
}

async function start(): Promise<void> {
    // Registering serviceworker.
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    }
    render(<Root />, document.getElementById("root"));
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
