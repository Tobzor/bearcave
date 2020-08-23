// deps
import React from "react";
// locals
import styles from "./styles.less";

import Header from "./header/Header";
import Content from "./content/Content";

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Content />
        </div>
    );
};

export default Home;
