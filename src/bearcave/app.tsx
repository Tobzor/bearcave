// Deps
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Locals
import { BearcaveRoot, AppRenderer } from "@components";
import { useEffectAsync } from "@utils";
import { Home } from "../homepage";
import "./index.css";

// TODO: create better imports for firebase config
import { createFirebase } from "../config";

import { getDocs, collection } from "@firebase/firestore/lite";

function Bearcave(): JSX.Element {
    useEffectAsync(async () => {
        const firebase = createFirebase();
        const appsRef = collection(firebase.db, "apps");

        try {
            const appsSnapshot = await getDocs(appsRef);
            appsSnapshot.docs.map((doc) => console.log(doc));
        } catch (error) {
            console.warn("Failed to fetch docs: ", error);
        }
    }, []);

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
