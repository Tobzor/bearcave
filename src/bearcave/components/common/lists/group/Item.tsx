import Fallback from "@assets/icons/fallback.svg";

import styles from "./styles.module.css";
import {ReactElement, ReactNode} from "react";

type ItemProps = {
    src: ReactNode | string;
    title: string;
    description: string;
};

function Item({ src, title, description }: ItemProps): ReactElement {
    return (
        <span className={styles.item}>
            {src ? (
                typeof src === "string" ? (
                    <img
                        className={styles.itemImage}
                        src={src}
                        alt={"Logo for " + title}
                    />
                ) : (
                    <span className={styles.itemImage}>{src}</span>
                )
            ) : (
                <img
                    className={styles.itemImage}
                    src={Fallback}
                    alt={"Fallback logo for: " + title}
                />
            )}
            <span className={styles.content}>
                <h3 style={{ margin: "0" }}>{title}</h3>
                <p style={{ margin: "0" }}>{description}</p>
            </span>
        </span>
    );
}

export { Item };
