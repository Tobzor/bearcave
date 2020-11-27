import styles from "./styles.css";

type ItemProps = {
    src: string;
    title: string;
    description: string;
};

function Item({ src, title, description }: ItemProps): JSX.Element {
    return (
        <div className={styles.container}>
            <img src={src} alt={"Logo for " + title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Item;
