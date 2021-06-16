// deps
import React from "react";
// locals
import { WithChildren } from "@types";
import { BearcaveFooter } from "@components";
import { usePWA } from "@utils";

// bearcave global css/theme things
import "@css/variables.css";
import "@css/mixins.css";
// local styling for cave
import styles from "./styles.css";

type BearcaveProps = WithChildren<{
    dialog: React.MutableRefObject<HTMLDivElement | null>;
    root: React.MutableRefObject<HTMLDivElement | null>;
}>;

function Bearcave({ dialog, root, children }: BearcaveProps): JSX.Element {
    usePWA();

    return (
        <>
            <div className={styles.root} ref={root}>
                <main className={styles.content}>{children}</main>
                <BearcaveFooter />
            </div>
            <div id="dialog-root" className={styles.dialog} ref={dialog}>
                {/* Modals, Clip */}
            </div>
        </>
    );
}

export default Bearcave;
