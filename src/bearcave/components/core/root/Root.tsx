// deps
import React from "react";
// locals
import { WithChildren } from "@types";

import "@css/variables.css";
import "@css/mixins.css";
import styles from "./styles.css";

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
