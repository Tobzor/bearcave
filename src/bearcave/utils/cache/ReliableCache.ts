import type {
    LocalCache,
    Events,
    ReliableStorage,
    StorageDictionary,
} from "@types";
import EventEmitter from "../event/EventEmitter";

type ReliableStorageProviderEvents<TCacheType> = {
    change: (storageProvider: TCacheType) => void;
};

type AdditionalEvents = Record<string, unknown>;

export default abstract class ReliableStorageProvider<
        TCacheType = LocalCache,
        TAdditionalEvents extends Events = AdditionalEvents,
        TEvents extends Events = ReliableStorageProviderEvents<TCacheType> &
            TAdditionalEvents
    >
    extends EventEmitter<TEvents>
    implements ReliableStorage<TCacheType> {
    protected provider: StorageDictionary;

    constructor(provider: StorageDictionary) {
        super();
        this.provider = provider;
    }

    async getAsync<TKey extends keyof TCacheType, T = TCacheType[TKey]>(
        key: TKey,
    ): Promise<T | null> {
        return (await this.provider.getAsync(key.toString())) as T;
    }

    async setAsync<TKey extends keyof TCacheType, T = TCacheType[TKey]>(
        key: TKey,
        value: T,
    ): Promise<void> {
        await this.provider.setAsync(key.toString(), value);
        await this.emitChangesAsync();
    }

    async spreadAsync<T = Partial<TCacheType>>(value: T): Promise<void> {
        await this.provider.spreadAsync(value);
        await this.emitChangesAsync();
    }

    async removeAsync<TKey extends keyof TCacheType>(key: TKey): Promise<void> {
        await this.provider.removeAsync(key.toString());
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
