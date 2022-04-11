import { Events, EventHandlerParameter } from "@types";

type Handler<
    TEvents extends Events,
    TKey extends keyof TEvents = keyof TEvents,
> = {
    key: TKey;
    handler: (arg: EventHandlerParameter<TEvents, TKey>) => void;
};

export abstract class EventEmitter<TEvents extends Events> {
    private handlers: Handler<TEvents>[] = [];

    on<TKey extends keyof TEvents>(
        key: TKey,
        handler: (arg: EventHandlerParameter<TEvents, TKey>) => void,
    ): () => void {
        const registeredHandler: Handler<TEvents> = {
            key,
            handler,
        };

        this.handlers.push(registeredHandler);

        return (): void => {
            const index = this.handlers.indexOf(registeredHandler);
            this.handlers.splice(index, 1);
        };
    }

    protected emit<
        TKey extends keyof TEvents,
        TParameter = EventHandlerParameter<TEvents, TKey>,
    >(key: TKey, arg: TParameter): this {
        const handlers = this.handlers.filter((h) => h.key === key);

        handlers.forEach((handler) => {
            const handlerFunction = handler.handler as TEvents[TKey];
            handlerFunction(arg);
        });

        return this;
    }
}
