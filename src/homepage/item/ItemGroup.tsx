import { WithChildren } from "@types";
import styles from "./styles.css";

type ItemGroupProps = WithChildren<{}>;

function ItemGroup({ children }: ItemGroupProps): JSX.Element {
    return <section className={styles.itemgroup}>{children}</section>;
}

export default ItemGroup;
