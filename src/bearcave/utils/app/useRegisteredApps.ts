// locals
import { AppManifest } from "@types";

import { apps } from "../app";

export function useRegisteredApps(): AppManifest[] {
    return apps.getAllApps();
}
