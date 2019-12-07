import JSON from "../utils/JSON";
import StorageDictionary, { Dictionary } from "./StorageDictionary";

type LocalCache = Dictionary;

export default class LocalStorageProvider implements StorageDictionary {
    private baseKey: string;
    private localCache: LocalCache | null = null;

    constructor(baseKey: string, defaultValue?: LocalCache) {
        this.baseKey = baseKey;

        const cachedString = localStorage.getItem(this.baseKey);
        const cachedValue = cachedString ? JSON.parse<LocalCache>(cachedString) : null;
        this.localCache = cachedValue;

        if (!cachedValue && defaultValue) {
            this.localCache = defaultValue;
        }
    }

    async getItemAsync<T>(key: string): Promise<T | null> {
        const localCache = await this.toObjectAsync();
        const value = localCache[key];

        if (!value) {
            return null;
        }
        return value as T;
    }

    async setItemAsync<T>(key: string, value: T): Promise<void> {
        const localCache = await this.toObjectAsync();
        this.localCache = {
            ...localCache,
            [key]: value,
        };
        await this.persistAsync();
    }

    async removeItemAsync(key: string): Promise<void> {
        const localCache = await this.toObjectAsync();
        delete localCache[key];
        this.localCache = { ...localCache };
        await this.persistAsync();
    }

    async clearAsync(): Promise<void> {
        this.localCache = {};

        localStorage.removeItem(this.baseKey);
    }

    async toObjectAsync(): Promise<LocalCache> {
        if (this.localCache === null) {
            const cachedString = localStorage.getItem(this.baseKey);
            const cachedValue = cachedString ? JSON.parse<LocalCache>(cachedString) : {};
            this.localCache = cachedValue;
        }

        return this.localCache as LocalCache;
    }

    toObject(): LocalCache | null {
        return this.localCache;
    }

    private async persistAsync(): Promise<void> {
        const cachedString = JSON.stringify(await this.toObjectAsync());
        localStorage.setItem(this.baseKey, cachedString);
    }
}
