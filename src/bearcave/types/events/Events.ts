export type Events = {
    [key: string]: (arg: any) => void;
};

export type EventHandlerParameter<
    TEvent extends Events,
    TKey extends keyof TEvent,
    THandler extends TEvent[TKey] = TEvent[TKey]
> = THandler extends (arg: infer P) => void ? P : never;
