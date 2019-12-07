import StorageDictionary, { Dictionary } from "../cache/StorageDictionary";
import EventEmitter, { Events } from "./EventEmitter";

export interface ReadonlyStorage<TCacheType> {
    getAsync<TKey extends keyof TCacheType, T>(key: TKey): Promise<T | null>;
    toObjectAsync(): Promise<TCacheType>;
    toObject(): TCacheType | null;
}

export interface ModifiableStorage<TCacheType> extends ReadonlyStorage<TCacheType> {
    setAsync<TKey extends keyof TCacheType>(key: TKey, value: TCacheType[TKey]): Promise<void>;
    removeAsync<TKey extends keyof TCacheType>(key: TKey): Promise<void>;
    clearAsync(): Promise<void>;
}

export abstract class ReadonlyReliableStorageProvider<TCacheType = Readonly<Dictionary>>
    implements ReadonlyStorage<TCacheType> {
    protected provider: StorageDictionary;

    constructor(provider: StorageDictionary) {
        this.provider = provider;
    }

    async getAsync<TKey extends keyof TCacheType, T>(key: TKey): Promise<T | null> {
        return await this.provider.getItemAsync(key.toString());
    }

    async toObjectAsync(): Promise<TCacheType> {
        const value = await this.provider.toObjectAsync();
        return value as TCacheType;
    }

    toObject(): TCacheType | null {
        const value = this.provider.toObject();
        return value as TCacheType;
    }
}

type ReliableStorageProviderEvents<TCacheType> = {
    change: (storageProvider: TCacheType) => void;
};
type AdditionalEvents = {};
export default abstract class ReliableStorageProvider<
    TCacheType = Dictionary,
    TAdditionalEvents extends Events = AdditionalEvents,
    TEvents extends Events = ReliableStorageProviderEvents<TCacheType> & TAdditionalEvents
> extends EventEmitter<TEvents> implements ModifiableStorage<TCacheType> {
    protected provider: StorageDictionary;

    constructor(provider: StorageDictionary) {
        super();
        this.provider = provider;
    }

    async getAsync<TKey extends keyof TCacheType, T = TCacheType[TKey]>(key: TKey): Promise<T | null> {
        return (await this.provider.getItemAsync(key.toString())) as T;
    }
    async setAsync<TKey extends keyof TCacheType, T = TCacheType[TKey]>(key: TKey, value: T): Promise<void> {
        await this.provider.setItemAsync(key.toString(), value);
        await this.emitChangesAsync();
    }

    async removeAsync<TKey extends keyof TCacheType>(key: TKey): Promise<void> {
        await this.provider.removeItemAsync(key.toString());
        await this.emitChangesAsync();
    }

    async clearAsync(): Promise<void> {
        await this.provider.clearAsync();
        await this.emitChangesAsync();
    }

    async toObjectAsync(): Promise<TCacheType> {
        const value = await this.provider.toObjectAsync();
        return value as TCacheType;
    }

    toObject(): TCacheType | null {
        return this.provider.toObject() as TCacheType;
    }

    private async emitChangesAsync(): Promise<void> {
        const storage = await this.toObjectAsync();
        this.emit("change", storage);
    }
}
