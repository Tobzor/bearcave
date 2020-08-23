// deps
import React from "react";
// locals
import styles from "./styles.less";

const Nav: React.FC = () => {
    return (
        <nav className={styles.container}>
            Shiny nav menu should collapse to mobile, use context for dynamic
            content and be possible to hide.
        </nav>
    );
};

export default Nav;
