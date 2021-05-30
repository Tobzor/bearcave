import { Fallback } from "@icons";

import styles from "./styles.css";

type ItemProps = {
    src: React.ReactNode | string;
    title: string;
    description: string;
};

function Item({ src, title, description }: ItemProps): JSX.Element {
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
                    <span className={styles.itemImage}>src</span>
                )
            ) : (
                <Fallback className={styles.itemImage} />
            )}
            <span>
                <h3 style={{ margin: "0" }}>{title}</h3>
                <p style={{ margin: "0" }}>{description}</p>
            </span>
        </span>
    );
}

export default Item;
