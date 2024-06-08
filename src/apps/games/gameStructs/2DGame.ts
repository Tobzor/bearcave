export abstract class DDGame {
    private _ctx: CanvasRenderingContext2D;
    protected canvas: HTMLCanvasElement;
    protected get ctx() {
        return this._ctx;
    }

    protected gameObjects: DDGameObject[] = [];

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Failed to grab 2d context");
        }
        this.canvas = canvas;
        this._ctx = ctx;
    }

    private _interval?: NodeJS.Timeout;

    public initialize?(): void;

    public start() {
        const ctx = this.ctx;

        this._interval = setInterval(() => this.draw(ctx), 10);
    }

    protected abstract draw(ctx: CanvasRenderingContext2D): void;

    public stop() {
        console.info("Stopping game loop.");
        if (this._interval) {
            clearInterval(this._interval);
        }
    }
}

export abstract class DDGameObject {
    public x: number;
    public y: number;

    public dx: number;
    public dy: number;

    protected canvas: HTMLCanvasElement;

    constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        canvas: HTMLCanvasElement,
    ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.canvas = canvas;
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void;
}
