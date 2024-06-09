import { ArrowButtonController, DDGameObject } from "./2DGame";

export class Paddle extends DDGameObject {
    public height: number;
    public width: number;

    private _ctrls: ArrowButtonController;

    constructor(
        ctrls: ArrowButtonController,
        height: number,
        width: number,
        ...args: ConstructorParameters<typeof DDGameObject>
    ) {
        super(...args);
        this.height = height;
        this.width = width;
        this._ctrls = ctrls;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    public update(): void {
        const ctrls = this._ctrls;

        if (ctrls.rightPressed) {
            this.x = Math.min(this.x + this.dx, this.canvas.width - this.width);
        } else if (ctrls.leftPressed) {
            this.x = Math.max(this.x - this.dx, 0);
        }
    }
}
