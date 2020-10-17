import { LocalCache } from "./CacheTypes";

export interface StorageDictionary {
    getAsync<T>(key: string): Promise<T | null>;
    setAsync<T>(key: string, value: T): Promise<void>;
    spreadAsync<T>(value: T): Promise<void>;
    removeAsync(key: string): Promise<void>;
    clearAsync(): Promise<void>;
    toObjectAsync(): Promise<LocalCache>;
    toObject(): LocalCache | null;
}

export interface ReliableStorage<TCacheType = LocalCache> {
    getAsync<TKey extends keyof TCacheType, T>(key: TKey): Promise<T | null>;
    setAsync<TKey extends keyof TCacheType>(
        key: TKey,
        value: TCacheType[TKey],
    ): Promise<void>;
    spreadAsync<TKey extends keyof TCacheType>(key: TKey): Promise<void>;
    removeAsync<TKey extends keyof TCacheType>(key: TKey): Promise<void>;
    clearAsync(): Promise<void>;
    toObjectAsync(): Promise<TCacheType>;
    toObject(): TCacheType | null;
}
