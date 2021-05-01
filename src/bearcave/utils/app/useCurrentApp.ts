// deps
import { useEffect, useState } from "react";
// locals
import { AppManifest } from "@types";

import { useBearcave } from "../core/BearcaveContext";

export function useCurrentApp(appKey: string): AppManifest | null {
    const {
        app: { container },
    } = useBearcave();

    const [app, setApp] = useState<AppManifest | null>(null);

    useEffect(() => {
        console.log("appkey effect running");
        const currapp = container.getCurrentApp(appKey);
        if (app?.key !== currapp?.key) {
            setApp(currapp);
        }
    }, [appKey]);

    return app;
}
