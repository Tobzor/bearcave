import type { LocalCache } from "@types";
import { Provider } from "./Provider";

export default class LocalStorageProvider extends Provider {
    constructor(baseKey: string, defaultValue?: LocalCache) {
        super("localStorage", baseKey, defaultValue);
    }
}
