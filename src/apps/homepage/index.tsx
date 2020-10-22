// deps
import React from "react";
// locals
import { registerCaveApp } from "@utils";
import styles from "./styles.css";

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

export default function register(): void {
    registerCaveApp({
        name: "Home",
        render: Home,
    });
}
