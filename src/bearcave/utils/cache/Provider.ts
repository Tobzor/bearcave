import type { ReliableDictionary, LocalCache } from "@types";
import { JSON } from "@utils";

type CacheLocation = "localStorage" | "sessionStorage";
export class Provider implements ReliableDictionary {
    local: LocalCache | null = null;

    constructor(
        cacheLocation: CacheLocation,
        baseKey: string,
        defaultValue?: LocalCache,
    ) {
        const existingString = window[cacheLocation].getItem(baseKey);

        if (existingString) {
            const existingParsed = JSON.parse<LocalCache>(existingString);
            this.local = existingParsed;
        }
    }

    async getAsync(key: string) {
        const localCache = await this.toObjectAsync();
        const value = localCache[key];

        if (!value) {
            return null;
        }

        return value;
    }

    async setAsync(key: string, value: any) {}
    async spreadAsync(key: string | null, value: any) {}
    async removeAsync(key: string) {}
    async clearAsync() {}

    async toObjectAsync() {}
    toObject() {}

    private async persistAsync(): Promise<void> {}
}
