// deps
import React from "react";
// locals
import styles from "./styles.css";
import { bearsplash } from "@images";

import { useBearcave } from "@utils";

const Header: React.FC = () => {
    const { locales } = useBearcave();

    return (
        <header className={styles.container}>
            <img src={bearsplash} className={styles.bannerImage} />
            {locales.header.bannerText}
        </header>
    );
};

export default Header;
