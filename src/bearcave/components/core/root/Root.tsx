// deps
import React from "react";
// locals
import styles from "./styles.css";
import { WithChildren } from "@types";

export type RootProps = WithChildren<{
    dialog: React.MutableRefObject<HTMLDivElement | null>;
    root: React.MutableRefObject<HTMLDivElement | null>;
}>;

function Root({ children, root, dialog }: RootProps): JSX.Element {
    return (
        <div className={styles.root}>
            <div ref={root}>{children}</div>
            <div id="dialog-root" className={styles.dialog} ref={dialog}>
                {/* modals, notifications */}
            </div>
        </div>
    );
}

export default Root;
