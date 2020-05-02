export interface ReliableDictionary {
    getAsync: (key: string) => any;
    setAsync: (key: string, value: any) => void;
    // spread value into given key (if any) or top level.
    spreadAsync: (key: string | null, value: any) => void;
    removeAsync: (key: string) => void;
    clearAsync: () => void;
}
