// deps
import React from "react";
import { createPortal } from "react-dom";
// locals
import { WithChildren } from "@types";
import { classnames, useBearcave } from "@utils";
import styles from "./styles.css";

type ModalProps = WithChildren<{
    show?: boolean;
    className?: string;
    close: () => void;
}>;

function Modal({
    show,
    close,
    className,
    children,
}: ModalProps): React.ReactPortal | null {
    const {
        refs: { dialog },
    } = useBearcave();

    if (!dialog.current || show === false) {
        return null;
    }

    const contentClass = classnames(styles.content, className);

    return createPortal(
        <div className={styles.container} onClick={close}>
            <div className={contentClass} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        dialog.current,
    );
}

export default Modal;
