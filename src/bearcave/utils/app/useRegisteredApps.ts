// deps
import { useEffect, useState } from "react";
// locals
import { AppManifest } from "@types";

import { useBearcave } from "../core/BearcaveContext";

type RegisteredAppsHook = {
    apps: AppManifest[];
};

export function useRegisteredApps(): RegisteredAppsHook {
    const {
        app: { container },
    } = useBearcave();

    const [apps, setApps] = useState<AppManifest[]>([]);

    useEffect(() => {
        const apps = container.getAllApps();
        setApps(apps);
    }, []);

    return { apps };
}
