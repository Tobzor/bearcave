import Fallback from "@assets/icons/fallback.svg";

import styles from "./styles.module.css";

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
                <img src={Fallback} className={styles.itemImage} />
            )}
            <span>
                <h3 style={{ margin: "0" }}>{title}</h3>
                <p style={{ margin: "0" }}>{description}</p>
            </span>
        </span>
    );
}

export { Item };
