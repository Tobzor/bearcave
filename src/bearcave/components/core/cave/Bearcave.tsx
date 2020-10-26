// deps
import React from "react";
// locals
import {
    BearcaveNav,
    BearcaveContent,
    BearcaveFooter,
    BearcaveRoot,
} from "@components";
import { RootProps } from "../root/Root";
import { WithChildren } from "@types";

type BearcaveProps = WithChildren<RootProps>;

function Bearcave({ overlay, root, children }: BearcaveProps): JSX.Element {
    return (
        <BearcaveRoot overlay={overlay} root={root}>
            <BearcaveNav />
            <BearcaveContent>{children}</BearcaveContent>
            <BearcaveFooter />
        </BearcaveRoot>
    );
}

export default Bearcave;
