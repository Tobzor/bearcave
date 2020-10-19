// deps
import React from "react";
// locals
import styles from "./styles.css";
import { bearsplash } from "@images";
import text from "@locales";

const Header: React.FC = () => {
    return (
        <header className={styles.container}>
            <img src={bearsplash} className={styles.bannerImage} />
            {text.no.header.bannerText}
        </header>
    );
};

export default Header;
