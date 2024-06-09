export abstract class DDGame {
    private _ctx: CanvasRenderingContext2D;
    public get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    protected _canvas: HTMLCanvasElement;
    public get canvas() {
        return this._canvas;
    }

    public gameObjects: DDGameObject[] = [];

    public destroyGameObject(toDestroy: DDGameObject) {
        toDestroy.destroy?.();
        this.gameObjects = this.gameObjects.filter((obj) => obj !== toDestroy);
    }

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Failed to grab 2d context");
        }

        this._canvas = canvas;
        this._ctx = ctx;

        document.addEventListener("keypress", this._keypress, false);
    }

    private _keypress = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "EnterPressed") {
            this.stop();
            this.start();
        }
    };

    private _interval?: NodeJS.Timeout;
    protected _frame?: number;

    public initialize?(): void;
    public destroy?(): void;

    public start() {
        // Ensure canvas is cleared before starting
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Initialize game
        this.initialize?.();
        // start game loop
        this.animate();
    }

    private animate() {
        this._frame = requestAnimationFrame(() => this.animate());
        this.main(this);
    }

    protected abstract main(engine: DDGame): void;

    public stop() {
        console.info("Running cleanup.");
        this.destroy?.();
        console.info("Stopping game loop.");
        if (this._interval) {
            clearInterval(this._interval);
        } else if (this._frame) {
            cancelAnimationFrame(this._frame);
            this._frame = undefined;
        }

        this.renderInfo();
    }

    protected renderInfo() {
        // Render text on canvas?
        this.ctx.font = "24px serif";

        const info = "Press 'Enter' to start";
        const text = this.ctx.measureText(info);
        this.ctx.fillText(
            info,
            this.canvas.width / 2 - text.width / 2,
            this.canvas.height / 2 + 24 / 2,
        );
    }
}

// Generic 2D game object
export abstract class DDGameObject {
    public x: number;
    public y: number;

    public dx: number;
    public dy: number;

    protected engine: DDGame;
    protected canvas: HTMLCanvasElement;

    constructor(x: number, y: number, dx: number, dy: number, engine: DDGame) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.engine = engine;
        this.canvas = engine.canvas;
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public collision?(engine: DDGame): void;
    public update?(ctrls?: ArrowButtonController): void;
    public destroy?(): void;
}

export class ArrowButtonController {
    public _leftPressed = false;
    public get leftPressed() {
        return this._leftPressed;
    }

    private _upPressed = false;
    public get upPressed() {
        return this._upPressed;
    }
    private _rightPressed = false;
    public get rightPressed() {
        return this._rightPressed;
    }
    private _downPressed = false;
    public get downPressed() {
        return this._downPressed;
    }

    constructor() {
        document.addEventListener("keydown", this._keyDownHandler, false);
        document.addEventListener("keyup", this._keyUpHandler, false);
    }

    private _keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this._rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this._leftPressed = true;
        }
    };

    private _keyUpHandler = (e: KeyboardEvent) => {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this._rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this._leftPressed = false;
        }
    };

    public destroy() {
        document.removeEventListener("keydown", this._keyDownHandler, false);
        document.removeEventListener("keyup", this._keyUpHandler, false);
    }
}
