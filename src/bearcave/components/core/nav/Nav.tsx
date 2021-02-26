// deps
import React from "react";
// locals
import { useBearcave } from "@utils";
import styles from "./styles.css";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

type HeaderProps = {
    children: typeof NavItem | typeof NavItem[];
};

function Header({ children }: HeaderProps): JSX.Element {
    const {
        app: { container },
    } = useBearcave();

    return (
        <header className={styles.container}>
            <NavLogo />

            <nav className={styles.navContainer}>{children}</nav>
        </header>
    );
}

export default Header;
