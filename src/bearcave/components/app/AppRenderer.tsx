// deps
import React, { useMemo } from "react";
import { Route, Routes, useParams } from "react-router";
// locals
import { useCurrentApp } from "@utils";

function AppRenderer(): JSX.Element {
    return (
        <Routes>
            <Route path="/">
                <AppBrowser />
            </Route>
            <Route path="/:appKey/*" element={<SingleAppRenderer />} />
        </Routes>
    );
}

function AppBrowser() {
    return <div>all them apps</div>;
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

function AppNotFound() {
    return <div>This is not the app you are looking for...</div>;
}

export default AppRenderer;
