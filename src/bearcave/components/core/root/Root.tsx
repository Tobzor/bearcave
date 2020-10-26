// deps
import React from "react";
// locals
import styles from "./styles.css";
import BearcaveContainer from "../container/Container";
import { WithChildren } from "@types";

export type RootProps = WithChildren<{
    overlay: React.MutableRefObject<HTMLDivElement | null>;
    root: React.MutableRefObject<HTMLDivElement | null>;
}>;

function Root({ children, root, overlay }: RootProps): JSX.Element {
    return (
        <div className={styles.root}>
            <BearcaveContainer ref={root}>{children}</BearcaveContainer>
            <div id="overlay-root" className={styles.overlay} ref={overlay}>
                {/* overlays, modals, notifications, tooltips and popovers */}
            </div>
        </div>
    );
}

export default Root;
