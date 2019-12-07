import ReliableStorageProvider from "../utils/ReliableStorageProvider";
import StorageDictionary from "../cache/StorageDictionary";

export type Search = {
    [key: string]: any;
};
/*
class SearchProvider implements StorageDictionary {}

export default class SearchClient extends ReliableStorageProvider<Search> {
    constructor(baseKey: string) {
        super();
    }
} */
