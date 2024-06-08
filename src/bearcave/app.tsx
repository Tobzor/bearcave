// Deps
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Locals
import { BearcaveRoot, AppRenderer } from "@components";
import { Home } from "../homepage";
import "./index.css";

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

export default function App(container: HTMLElement) {
    const root = createRoot(container);
    return root.render(
        <StrictMode>
            <Bearcave />
        </StrictMode>,
    );
}
