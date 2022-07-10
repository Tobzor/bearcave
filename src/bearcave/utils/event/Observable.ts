import { Value } from "./Value";

type Event<T> = (newValue: T, oldValue: T) => void;
type Handler<T> = {
    key: number;
    event: Event<T>;
};

class Observable<T> extends Value<T> {
    private handlers: Array<Handler<T>> = [];

    public on(event: Event<T>) {
        const key = this.handlers.length;
        const registeredHandler: Handler<T> = {
            key,
            event,
        };

        this.handlers.push(registeredHandler);

        return (): void => {
            this.handlers.splice(registeredHandler.key, 1);
        };
    }

    public off(key: number) {
        this.handlers.splice(key, 1);
    }

    public setValue(value: T): void {
        const oldValue = this.getValue();
        super.setValue(value);
        this.emit(value, oldValue);
    }

    private emit(newValue: T, oldValue: T) {
        this.handlers.forEach((handler) => handler.event(newValue, oldValue));
    }
}

export { Observable };
