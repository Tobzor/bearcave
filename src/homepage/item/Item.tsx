import styles from "./styles.css";

type ItemProps = {
    src: string;
    title: string;
    description: string;
};

function Item({ src, title, description }: ItemProps): JSX.Element {
    return (
        <div className={styles.item}>
            <img src={src} alt={"Logo for " + title} />
            <span>
                <h3 style={{ margin: "0" }}>{title}</h3>
                <p style={{ margin: "0" }}>{description}</p>
            </span>
        </div>
    );
}

export default Item;
