import { ArrowButtonController, DDGame, DDGameObject } from "./2DGame";
import { Paddle } from "./Paddle";

export class BreakoutGame extends DDGame {
    private _ctrls?: ArrowButtonController;
    public initialize(): void {
        const ctrls = new ArrowButtonController();
        // Create ball object
        const ball = new Ball(
            10,
            this.canvas.width / 2,
            this.canvas.height - 30,
            2,
            -2,
            this,
        );

        const paddle = new Paddle(
            ctrls,
            10,
            75,
            (this.canvas.width - 75) / 2,
            this.canvas.height - 10,
            7,
            0,
            this,
        );

        const bricks = createBricks(this);

        this.gameObjects.push(ball, paddle, ...bricks.flat());
        this._ctrls = ctrls;
    }

    public destroy(): void {
        this.gameObjects.forEach((obj) => obj.destroy?.());
        this.gameObjects = [];
        this._ctrls?.destroy();
    }

    protected main(engine: DDGame) {
        const ctx = engine.ctx;
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // We allow all objects to draw themselves
        this.gameObjects.forEach((obj) => {
            // Draw object
            obj.draw(ctx);
            // Then allow object to move
            obj.update?.();
            // Calculate collisions
            obj.collision?.(engine);
        });
    }
}

function createBricks(engine: DDGame): Array<Brick[]> {
    // Create brick wall
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    const bricks: Array<Brick[]> = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r] = new Brick(
                brickWidth,
                brickHeight,
                brickX,
                brickY,
                0,
                0,
                engine,
            );
        }
    }

    return bricks;
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
    }

    public collision(engine: DDGame) {
        if (
            this.x + this.dx > this.canvas.width - this.radius ||
            this.x + this.dx < this.radius
        ) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > this.canvas.height - this.radius) {
            const paddle = engine.gameObjects.find(
                (obj) => obj instanceof Paddle,
            );
            if (paddle instanceof Paddle) {
                if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                    this.dy = -this.dy;
                } else {
                    // falling outside arena
                    engine.stop();
                }
            } else {
                // No paddle,
                engine.stop();
            }
        }

        // Brick collision
        const bricks = engine.gameObjects.filter(
            (obj) => obj instanceof Brick,
        ) as Brick[];

        for (const brick of bricks) {
            if (
                this.x > brick.x &&
                this.x < brick.x + brick.width &&
                this.y > brick.y &&
                this.y < brick.y + brick.height
            ) {
                // We hit this brick
                this.dy = -this.dy; // change direction
                engine.destroyGameObject(brick); // remove brick we hit
            }
        }
    }

    public update() {
        // Move ball
        this.x += this.dx;
        this.y += this.dy;
    }
}

class Brick extends DDGameObject {
    public width: number;
    public height: number;
    constructor(
        width: number,
        height: number,
        ...args: ConstructorParameters<typeof DDGameObject>
    ) {
        super(...args);
        this.width = width;
        this.height = height;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
