// deps
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router";
// locals
import { AppManifest, useBearcave } from "@utils";
import Home from "./homepage";

function useCurrentApp(): AppManifest | null {
    const {
        app: { container },
    } = useBearcave();

    const [app, setApp] = useState<AppManifest | null>(null);

    useEffect(() => {
        const currapp = container.getCurrentApp();

        if (app?.key !== currapp?.key) {
            setApp(currapp);
        }
    }, [window.location.pathname]);

    return app;
}

function BearcaveApps(): JSX.Element {
    const app = useCurrentApp();

    const AppComponent = useMemo(() => {
        if (app) {
            return app.render;
        }

        return () => null;
    }, [app]);

    // TODO: render router with scoped history for apps
    // TODO: make nav + footer opt in?
    // TODO: add possibility for apps to use their own settings. (auto scoped ++)

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="apps/*">
                <Route path="/" element={<AppBrowser />} />
                <Route path={app?.key + "/*"} element={<AppComponent />} />
                <Route path="*" element={<AppNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

function AppBrowser() {
    return <div>This is for browsing apps</div>;
}

function AppNotFound() {
    return <div>Could not find the app for this url.</div>;
}

function PageNotFound() {
    return <div>Could not find the requested page.</div>;
}

export default BearcaveApps;
