// deps
import React from "react";
import { NavLink } from "react-router-dom";
// locals
import styles from "./styles.css";
import { WithChildren } from "@types";

type NavItemProps = WithChildren<{
    linkTo?: string;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}>;

function NavItem({ onClick, linkTo, children }: NavItemProps): JSX.Element {
    if (linkTo) {
        return (
            <NavLink
                className={styles.navItem}
                activeClassName={styles.activeNavItem}
                to={linkTo}
                onClick={onClick}
            >
                {children}
            </NavLink>
        );
    }

    return (
        <div className={styles.navItem} onClick={onClick}>
            {children}
        </div>
    );
}

export default NavItem;
