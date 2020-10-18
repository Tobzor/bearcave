// deps
import React, { useEffect } from "react";
// locals
import styles from "./styles.css";
import BearcaveContainer from "../container/Container";

type RootProps = {
    overlay: React.MutableRefObject<HTMLDivElement | null>;
    root: React.MutableRefObject<HTMLDivElement | null>;
};

const Root: React.FC<RootProps> = ({ children, root, overlay }) => {
    return (
        <div className={styles.root}>
            <BearcaveContainer ref={root}>{children}</BearcaveContainer>
            <div id="overlay-root" className={styles.overlay} ref={overlay}>
                {/* overlays, modals, notifications, tooltips and popovers */}
            </div>
        </div>
    );
};

export default Root;
