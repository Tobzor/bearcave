import type { LocalCache } from "@types";
import { Provider } from "./Provider";

export class LocalStorageProvider extends Provider {
    constructor(baseKey: string, defaultValue?: LocalCache) {
        super("localStorage", baseKey, defaultValue);
    }
}
