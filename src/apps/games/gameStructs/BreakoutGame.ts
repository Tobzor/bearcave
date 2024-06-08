import { DDGame, DDGameObject } from "./2DGame";

export class BreakoutGame extends DDGame {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.initialize();
    }

    public initialize(): void {
        // Create ball object
        const ball = new Ball(
            10,
            this.canvas.width / 2,
            this.canvas.height - 30,
            2,
            -2,
            this.canvas,
        );
        this.gameObjects.push(ball);
    }

    protected draw(ctx: CanvasRenderingContext2D) {
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.gameObjects.forEach((obj) => obj.draw(ctx));
    }
}

class Ball extends DDGameObject {
    public radius: number;

    constructor(
        radius: number,
        ...rest: ConstructorParameters<typeof DDGameObject>
    ) {
        super(...rest);

        this.radius = radius;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();

        this.collisionDetection();
        // Move ball
        this.x += this.dx;
        this.y += this.dy;
    }

    private collisionDetection() {
        if (
            this.x + this.dx > this.canvas.width - this.radius ||
            this.x + this.dx < this.radius
        ) {
            this.dx = -this.dx;
        }

        if (
            this.y + this.dy > this.canvas.height - this.radius ||
            this.y + this.dy < this.radius
        ) {
            this.dy = -this.dy;
        }
    }
}
