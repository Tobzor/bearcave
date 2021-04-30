// Deps
import { useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Locals
import "@css/variables.css";

import { BearcaveContext, createBearcave } from "@utils";
import { Bearcave, AppRenderer } from "@components";
import Home from "./homepage";

function Root(): JSX.Element {
    const dialog = useRef(null);
    const root = useRef(null);
    const bearcaveContext = createBearcave({ root, dialog });

    return (
        <BearcaveContext.Provider value={bearcaveContext}>
            <BrowserRouter>
                <Bearcave root={root} dialog={dialog}>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="apps/*" element={<AppRenderer />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Bearcave>
            </BrowserRouter>
        </BearcaveContext.Provider>
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
