// deps
import React from "react";
// locals
import { classnames } from "@utils";
import { WithChildren } from "@types";

import styles from "./styles.css";
import NavLogo from "./NavLogo";

type HeaderProps = WithChildren<unknown>;

function Header({ children }: HeaderProps): JSX.Element {
    const headerContainer = classnames(styles.container, {
        [styles.onlyLogo]: !children,
    });

    return (
        <header className={headerContainer}>
            <NavLogo />

            {children && (
                <nav className={styles.navContainer}>
                    {/* TODO: Add app context menu as a dropdown?  */}
                    {children}
                </nav>
            )}
        </header>
    );
}

export default Header;
