// deps
import React from "react";
// locals
import styles from "./styles.less";

const NavItem: React.FC = ({ children }) => {
    return <div className={styles.item}>{children}</div>;
};

export default NavItem;
