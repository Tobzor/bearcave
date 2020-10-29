// deps
import React, { useState } from "react";
import { Link } from "react-router-dom";
// locals
import { useBearcave } from "@utils";
import { Modal } from "@components";
import styles from "./styles.css";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

function Header(): JSX.Element {
    const [show, setShow] = useState(false);

    const {
        app: { container },
    } = useBearcave();

    return (
        <header className={styles.container}>
            <NavLogo />

            {/* Should be collapsed into one menu icon and open drawer/modal on mobiles */}
            <Modal show={show} close={() => setShow(false)}>
                <div>this is modal</div>
            </Modal>
            <nav className={styles.navContainer}>
                <NavItem onClick={() => setShow(true)}>Modal</NavItem>
                <NavItem>
                    <Link to={container.appsOverviewUrl}>Apps</Link>
                </NavItem>
            </nav>
        </header>
    );
}

export default Header;
