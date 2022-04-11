// Deps
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Locals
import { BearcaveRoot, AppRenderer } from "@components";
import { isDev } from "@utils";

import Home from "./homepage";

function Root(): JSX.Element {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <BearcaveRoot>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="apps/*" element={<AppRenderer />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BearcaveRoot>
            </Router>
        </Suspense>
    );
}

function PageNotFound() {
    return <div>Could not find the requested page.</div>;
}

async function start(): Promise<void> {
    // Registering serviceworker.
    if ("serviceWorker" in navigator && !isDev()) {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    }

    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(<Root />);
    } else {
        throw new Error("Bearcave failed to create root");
    }
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
