// deps
import React from "react";
// locals
import styles from "./styles.css";

import NavItem from "./NavItem";

const Header: React.FC = () => {
    // return <div style={{ backgroundColor: "var(--color-primary)" }} />;
    return (
        <header className={styles.container}>
            <nav className={styles.navContainer}>
                <NavItem>home</NavItem>
                <NavItem>about</NavItem>
            </nav>
        </header>
    );
};

export default Header;
