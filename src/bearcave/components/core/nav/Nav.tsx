// deps
import React from "react";
// locals
import styles from "./styles.less";

const Nav: React.FC = () => {
    return (
        <nav className={styles.container}>
            <div>home</div>
            <div>about</div>
        </nav>
    );
};

export default Nav;
