// deps
import React from "react";
import { Link } from "react-router-dom";
// locals
import { useBearcave } from "@utils";
import styles from "./styles.css";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

function Header(): JSX.Element {
    const {
        app: { container },
    } = useBearcave();

    return (
        <header className={styles.container}>
            <NavLogo />
            <nav className={styles.navContainer}>
                <NavItem>
                    <Link to={container.appsOverviewUrl}>Apps</Link>
                </NavItem>
            </nav>
        </header>
    );
}

export default Header;
