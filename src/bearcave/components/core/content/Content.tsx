// deps
import React from "react";
// locals
import styles from "./style.css";

const Content: React.FC = ({ children }) => {
    return <main className={styles.container}>{children}</main>;
};

export default Content;
