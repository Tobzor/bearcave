// deps
import { useEffect, useState } from "react";
// locals
import { AppManifest } from "@types";

import { apps } from "./AppContainer";

export function useCurrentApp(appKey?: string): AppManifest | undefined {
    const [app, setApp] = useState<AppManifest | undefined>(() =>
        apps.getCurrentApp(appKey),
    );

    useEffect(() => {
        const currapp = apps.getCurrentApp(appKey);
        if (app?.key !== currapp?.key) {
            setApp(currapp);
        }
    }, [appKey, app]);

    return app;
}
