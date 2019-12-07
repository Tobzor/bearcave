import ReliableStorageProvider from "../utils/ReliableStorageProvider";
import LocalStorageProvider from "../cache/LocalStorageProvider";

export type Settings = {
    [key: string]: any;
};

export default class SettingsContainer<T = Settings> extends ReliableStorageProvider<T> {
    constructor(baseKey: string, defaultSettings?: Settings) {
        super(new LocalStorageProvider(`STID_SETTINGS_CACHE:${baseKey}`, defaultSettings));
    }
}
