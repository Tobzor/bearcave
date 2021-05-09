// deps
import React from "react";
import { createPortal } from "react-dom";
// locals
import { WithChildren } from "@types";
import { classnames, useBearcave } from "@utils";
import { Overlay } from "@components";
import styles from "./styles.css";

type ModalProps = WithChildren<{
    show: boolean;
    close: () => void;
    className?: string;
    closeOnOutsideClick?: boolean;
}>;

function Modal({
    show,
    close,
    className,
    closeOnOutsideClick,
    children,
}: ModalProps): React.ReactPortal | null {
    const {
        refs: { dialog },
    } = useBearcave();

    if (!dialog.current || show === false) {
        return null;
    }

    function handleClickOutside() {
        closeOnOutsideClick && close();
    }

    const contentClass = classnames(styles.content, className);

    return createPortal(
        <Overlay onClick={handleClickOutside}>
            <div className={contentClass} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </Overlay>,
        dialog.current,
    );
}

export default Modal;
