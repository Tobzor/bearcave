// deps
import React from "react";
// locals
import styles from "./styles.css";

import Header from "./header/Header";
import Content from "./content/Content";

function Home(): JSX.Element {
    return (
        <div className={styles.container}>
            <Header />
            <Content />
        </div>
    );
}

export default Home;
