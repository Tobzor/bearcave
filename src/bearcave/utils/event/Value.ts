class Value<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public getValue(): T {
        return this.value;
    }
    public setValue(value: T): void {
        this.value = value;
    }
}

export { Value };
