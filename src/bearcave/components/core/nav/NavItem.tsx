// deps
import React from "react";
// locals
import styles from "./styles.css";
import { WithChildren } from "@types";

type NavItemProps = WithChildren<{
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}>;

function NavItem({ onClick, children }: NavItemProps): JSX.Element {
    return (
        <div className={styles.item} onClick={onClick}>
            {children}
        </div>
    );
}

export default NavItem;
