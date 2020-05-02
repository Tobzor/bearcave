import { Provider } from "./Provider";
import { LocalCache } from "@types";

export default class SessionStorageProvider extends Provider {
    constructor(baseKey: string, defaultValue?: LocalCache) {
        super("sessionStorage", baseKey, defaultValue);
    }
}
