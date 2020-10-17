// deps
import React from "react";
// locals
import styles from "./style.less";

const Content: React.FC = ({ children }) => {
    return <main className={styles.container}>{children}</main>;
};

export default Content;
