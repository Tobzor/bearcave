export type Dictionary = {
    [key: string]: any;
};

export default interface StorageDictionary {
    getItemAsync<T>(key: string): Promise<T | null>;
    setItemAsync<T>(key: string, value: T): Promise<void>;
    removeItemAsync(key: string): Promise<void>;
    clearAsync(): Promise<void>;
    toObjectAsync(): Promise<Dictionary>;
    toObject(): Dictionary | null;
};
