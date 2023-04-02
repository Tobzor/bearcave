// Deps
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Locals
import "./index.css";
import { BearcaveRoot, AppRenderer } from "@components";
import { Home } from "./homepage";

function Bearcave(): JSX.Element {
    return (
        <Router>
            <BearcaveRoot>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="apps/*" element={<AppRenderer />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BearcaveRoot>
        </Router>
    );
}

function PageNotFound() {
    return <div>Could not find the requested page.</div>;
}

async function start(): Promise<void> {
    /**
     * We dynamically import all index files under apps/* to include in bundle
     * //TODO: can this be done via vite config instead?
     */
    const appModules = import.meta.glob("./apps/**/index.tsx");
    for (const appPath in appModules) {
        await appModules[appPath]();
    }

    const container = document.getElementById("root");
    if (container) {
        const root = createRoot(container);
        root.render(
            <StrictMode>
                <Bearcave />
            </StrictMode>,
        );
    } else {
        throw new Error("Bearcave failed to create root");
    }
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
