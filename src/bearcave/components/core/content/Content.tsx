// deps
import React from "react";
// locals
import styles from "./style.less";

const Content: React.FC = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default Content;
