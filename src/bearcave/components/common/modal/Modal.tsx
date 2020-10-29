// deps
import React from "react";
import { createPortal } from "react-dom";
// locals
import { WithChildren } from "@types";
import { useBearcave } from "@utils";
import styles from "./styles.css";

type ModalProps = WithChildren<{
    show?: boolean;
    close: () => void;
}>;

function Modal({
    show,
    close,
    children,
}: ModalProps): React.ReactPortal | null {
    const {
        refs: { dialog },
    } = useBearcave();

    if (!dialog.current || show === false) {
        return null;
    }

    return createPortal(
        <div className={styles.container}>{children}</div>,
        dialog.current,
    );
}

export default Modal;
