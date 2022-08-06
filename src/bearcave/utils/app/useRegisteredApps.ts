// locals
import { AppManifest } from "@types";

import { apps } from "./AppContainer";

export function useRegisteredApps(): AppManifest[] {
    return apps.getAllApps();
}
