export type EventHandlerParameter<
    TEvent extends Events,
    TKey extends keyof TEvent,
    THandler extends TEvent[TKey] = TEvent[TKey]
> = THandler extends (arg: infer P) => void ? P : never;

type Handler<TEvents extends Events, TKey extends keyof TEvents = keyof TEvents> = {
    key: TKey;
    handler: (arg: EventHandlerParameter<TEvents, TKey>) => void;
};

export type Events = {
    [key: string]: (arg: any) => void;
};

type unsubscribe = {
    unsubscribe: () => void;
};

export default abstract class EventEmitter<TEvents extends Events> {
    private handlers: Handler<TEvents>[] = [];

    on<TKey extends keyof TEvents>(key: TKey, handler: (arg: EventHandlerParameter<TEvents, TKey>) => void): unsubscribe {
        const registeredHandler: Handler<TEvents> = {
            key,
            handler,
        };

        this.handlers.push(registeredHandler);

        return {
            unsubscribe: () => {
                const index = this.handlers.indexOf(registeredHandler);
                this.handlers.splice(index, 1);
            },
        };
    }

    protected emit<TKey extends keyof TEvents, TParameter = EventHandlerParameter<TEvents, TKey>>(
        key: TKey,
        arg: TParameter,
    ): this {
        const handlers = this.handlers.filter(h => h.key === key);

        handlers.forEach(handler => {
            const handlerFunction = handler.handler as TEvents[TKey];
            window.requestAnimationFrame(() => handlerFunction(arg));
        });

        return this;
    }
}
