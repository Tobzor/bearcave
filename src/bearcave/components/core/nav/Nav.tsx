// deps
import React from "react";
// locals
import { useBearcave } from "@utils";
import styles from "./styles.css";
import NavItem, { NavItemProps } from "./NavItem";
import NavLogo from "./NavLogo";

type HeaderProps = {
    children: JSX.Element | JSX.Element[];
};

function Header({ children }: HeaderProps): JSX.Element {
    const {
        app: { container },
    } = useBearcave();

    return (
        <header className={styles.container}>
            <NavLogo />

            <nav className={styles.navContainer}>
                {/* TODO: Add app context menu as a dropdown?  */}
                {children}
            </nav>
        </header>
    );
}

export default Header;
