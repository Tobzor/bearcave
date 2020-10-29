// deps
import React from "react";
// locals
import { BearcaveFooter, BearcaveRoot } from "@components";
import { RootProps } from "../root/Root";
import { WithChildren } from "@types";

import styles from "./styles.css";

type BearcaveProps = WithChildren<RootProps>;

function Bearcave({ dialog, root, children }: BearcaveProps): JSX.Element {
    return (
        <BearcaveRoot dialog={dialog} root={root}>
            {/* TODO: add navigation breadcrumbs... */}
            <main className={styles.content}>{children}</main>
            <BearcaveFooter />
        </BearcaveRoot>
    );
}

export default Bearcave;
