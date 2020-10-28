// deps
import React from "react";
import { Link } from "react-router-dom";
// locals
import styles from "./styles.css";

function NavLogo(): JSX.Element {
    return (
        <div className={styles.navLogo}>
            <Link to="/">TODO: ADD ICON</Link>
        </div>
    );
}

export default NavLogo;
