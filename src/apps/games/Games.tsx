import { useEffect, useState } from "react";

import { BreakoutGame } from "./gameStructs/BreakoutGame";

import styles from "./styles.module.css";

export default function Games() {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    return (
        <section>
            <h1>Games</h1>

            <section>
                <canvas
                    className={styles.canvas}
                    ref={setCanvas}
                    id="gamesCanvas"
                    width="480"
                    height="320"
                ></canvas>

                {canvas && <BreakoutV1Game canvas={canvas} />}
            </section>
        </section>
    );
}

type BreakoutV1Game = {
    canvas: HTMLCanvasElement;
};
function BreakoutV1Game({ canvas }: BreakoutV1Game) {
    useEffect(() => {
        console.log("Running effect");
        const game = new BreakoutGame(canvas);
        game.start();

        return () => {
            game.stop();
        };
    }, [canvas]);

    return null;
}
