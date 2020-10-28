// deps
import React from "react";
// locals
import styles from "./styles.css";
import { WithChildren } from "@types";

function NavItem({ children }: WithChildren): JSX.Element {
    return <div className={styles.item}>{children}</div>;
}

export default NavItem;
