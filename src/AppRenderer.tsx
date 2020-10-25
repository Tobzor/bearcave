// deps
import React, { useEffect, useMemo, useState } from "react";
// locals
import { BearcaveContent, BearcaveFooter, BearcaveNav } from "@components";
import { AppManifest, useBearcave } from "@utils";

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

const BearcaveApps: React.FC = () => {
    const app = useCurrentApp();

    const AppComponent = useMemo(() => {
        if (app) {
            return app.render;
        }

        return () => null;
    }, [app]);

    return (
        <>
            <BearcaveNav />
            <BearcaveContent>
                <AppComponent />
            </BearcaveContent>
            <BearcaveFooter />
        </>
    );
};

export default BearcaveApps;
