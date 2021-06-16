// deps
import React, { useState } from "react";
// locals
import { classnames } from "@utils";
import { Clip } from "@components";
import { WithChildren } from "@types";
import styles from "./styles.css";
import NavLogo from "./NavLogo";

type HeaderProps = WithChildren<unknown>;

function Header({ children }: HeaderProps): JSX.Element {
    const headerContainer = classnames(styles.container, {
        [styles.onlyLogo]: !children,
    });

    const [showClip, setShowClip] = useState(false);

    return (
        <header className={headerContainer}>
            <NavLogo />
            <button onClick={() => setShowClip(true)}>clip</button>
            <Clip show={showClip} close={() => setShowClip(false)}>
                <div>Clip things</div>
            </Clip>

            {children && (
                <nav className={styles.navContainer}>
                    {/* TODO: Add app context menu as a dropdown?  */}
                    {children}
                </nav>
            )}
        </header>
    );
}

export default Header;
