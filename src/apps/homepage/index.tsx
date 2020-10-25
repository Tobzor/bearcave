// deps
import React from "react";
// locals
import { registerCaveApp } from "@utils";
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

registerCaveApp({
    key: "home",
    name: "Home",
    render: Home,
});
