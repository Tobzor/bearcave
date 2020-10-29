// deps
import React from "react";
import { Link } from "react-router-dom";
// locals
import { bearsplash } from "@images";
import styles from "./styles.css";

function NavLogo(): JSX.Element {
    return (
        <div className={styles.navLogo}>
            <Link to="/">
                <img src={bearsplash} alt="logo" />
                <span>bearcave</span>
            </Link>
        </div>
    );
}

export default NavLogo;
