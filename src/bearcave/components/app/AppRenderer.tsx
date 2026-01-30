// deps
import {ReactElement, Suspense, useMemo} from "react";
import { Route, Routes, useParams } from "react-router";
// locals
import { useCurrentApp } from "@utils";
import { Breadcrumbs } from "@components";

import { AppNotFound } from "./AppNotFound";
import { AppBrowser } from "./AppBrowser";

function AppRenderer(): ReactElement {
    return (
        <Routes>
            <Route path="/" element={<AppBrowser />} />
            <Route
                path="/:appKey/*"
                element={
                    <>
                        <Breadcrumbs />
                        <SingleAppRenderer />
                    </>
                }
            />
        </Routes>
    );
}

function NullComponent() {
    return null;
}

function SingleAppRenderer(): ReactElement {
    const { appKey } = useParams();

    const app = useCurrentApp(appKey);

    const AppComponent = useMemo(() => {
        if (app) {
            return app.render;
        }

        return NullComponent;
    }, [app]);

    if (!app) {
        return <AppNotFound />;
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AppComponent />
        </Suspense>
    );
}

export { AppRenderer };
