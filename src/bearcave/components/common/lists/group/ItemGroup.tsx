import { WithChildren } from "@types";
import styles from "./styles.css";

type ItemGroupProps = WithChildren<{
    title?: string;
}>;

function ItemGroup({ title, children }: ItemGroupProps): JSX.Element {
    return (
        <>
            {title && <h2>{title}</h2>}
            <section className={styles.itemgroup}>{children}</section>
        </>
    );
}

export { ItemGroup };
