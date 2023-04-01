// Deps
import { StrictMode, Suspense } from "react";
import { Root, createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
// Locals
import { BearcaveRoot, AppRenderer } from "@components";
import { isDev } from "@utils";

import { Home } from "./homepage";

function Bearcave(): JSX.Element {
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


/**
 * TODO: can this be done via vite config instead?
 */
const appModules = import.meta.glob("./apps/**/index.tsx");
for (const appPath in appModules) {
    await appModules[appPath]();
}

async function start(): Promise<void> {
    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(<StrictMode><Bearcave /></StrictMode>);
    } else {
        throw new Error("Bearcave failed to create root");
    }
    
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
