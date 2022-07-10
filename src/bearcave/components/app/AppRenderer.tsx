// deps
import React, { useMemo } from "react";
import { Route, Routes, useParams } from "react-router";
// locals
import { useCurrentApp } from "@utils";
import { Breadcrumbs } from "@components";

import { AppNotFound } from "./AppNotFound";
import { AppBrowser } from "./AppBrowser";

function AppRenderer(): JSX.Element {
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

function SingleAppRenderer() {
    const { appKey } = useParams();

    const app = useCurrentApp(appKey);

    const AppComponent = useMemo(() => {
        if (app) {
            return app.render;
        }

        return () => null;
    }, [app]);

    if (!app) {
        return <AppNotFound />;
    }

    return <AppComponent />;
}

export { AppRenderer };
