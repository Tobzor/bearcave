// deps
import React from "react";
// locals
import styles from "./styles.css";

import NavItem from "./NavItem";

const Nav: React.FC = () => {
    // return <div style={{ backgroundColor: "var(--color-primary)" }} />;
    return (
        <nav className={styles.container}>
            <NavItem>home</NavItem>
            <NavItem>about</NavItem>
        </nav>
    );
};

export default Nav;
