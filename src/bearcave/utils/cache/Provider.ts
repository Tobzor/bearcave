import type { StorageDictionary, LocalCache } from "@types";
import { JSON } from "@utils";

type CacheLocation = "localStorage" | "sessionStorage";

export class Provider implements StorageDictionary {
    private baseKey: string;
    private cacheLocation: CacheLocation;
    private localCache: LocalCache | null = null;

    constructor(
        cacheLocation: CacheLocation,
        baseKey: string,
        defaultValue?: LocalCache,
    ) {
        this.cacheLocation = cacheLocation;
        this.baseKey = baseKey;

        const cachedString = window[this.cacheLocation].getItem(this.baseKey);
        const cachedValue = cachedString
            ? JSON.parse<LocalCache>(cachedString)
            : null;
        this.localCache = cachedValue;

        // using default if no cached value exists.
        if (!cachedValue && defaultValue) {
            this.localCache = defaultValue;
        }

        // merging cached settings with default - where cached gets prio.
        if (cachedValue && defaultValue) {
            this.localCache = {
                ...defaultValue,
                ...cachedValue,
            };
        }
    }

    async getAsync<T>(key: string): Promise<T | null> {
        const localCache = await this.toObjectAsync();
        const value = localCache[key];

        if (!value) {
            return null;
        }

        return value as T;
    }

    async setAsync<T>(key: string, value: T): Promise<void> {
        const cache = await this.toObjectAsync();
        cache[key] = value;
        this.localCache = { ...cache };
        await this.persistAsync();
    }

    async spreadAsync<T>(value: T): Promise<void> {
        const cache = await this.toObjectAsync();
        this.localCache = { ...cache, ...value };
        await this.persistAsync();
    }

    async spreadItemAsync<T>(key: string, value: T): Promise<void> {
        const cache = await this.toObjectAsync();
        cache[key] = { ...cache[key], ...value };
        this.localCache = { ...cache };
        await this.persistAsync();
    }

    async removeAsync(key: string): Promise<void> {
        const cache = await this.toObjectAsync();
        delete cache[key];
        this.localCache = { ...cache };
        await this.persistAsync();
    }

    async clearAsync(): Promise<void> {
        this.localCache = {};
        window[this.cacheLocation].removeItem(this.baseKey);
    }

    async toObjectAsync(): Promise<LocalCache> {
        if (this.localCache === null) {
            const cachedString = window[this.cacheLocation].getItem(
                this.baseKey,
            );
            const cachedValue = cachedString
                ? JSON.parse<LocalCache>(cachedString)
                : {};
            return cachedValue as LocalCache;
        }

        return this.localCache as LocalCache;
    }

    toObject(): LocalCache | null {
        return this.localCache || null;
    }

    private async persistAsync(): Promise<void> {
        const cachedString = JSON.stringify(await this.toObjectAsync());
        window[this.cacheLocation].setItem(this.baseKey, cachedString);
    }
}
