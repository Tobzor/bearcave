// deps
import { useCallback } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
// locals
import { useDialog, useKeyPress } from "@utils";
import { Overlay } from "@components";
import { WithChildren } from "@types";
import styles from "./styles.module.css";

type ClipProps = WithChildren<{
    show: boolean;
    close: () => void;
}>;

export function Clip({ show, close, children }: ClipProps): JSX.Element | null {
    const dialog = useDialog();

    const handleClose = useCallback(() => show && close(), [close]);

    if (!dialog || show === false) {
        return null;
    }
    // TODO: add css transitiongroup and animate popping up from below.
    // display on desktop, tablet + mobile.

    const classnameTransition = {
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
    };

    return createPortal(
        <Overlay onClick={handleClose}>
            <CSSTransition
                in={show}
                timeout={300}
                classNames={classnameTransition}
            >
                <ModalContent close={handleClose}>{children}</ModalContent>
            </CSSTransition>
        </Overlay>,
        dialog,
    );
}

type ModalContentProps = WithChildren<{
    close: () => void;
}>;
function ModalContent({ close, children }: ModalContentProps) {
    useKeyPress("Escape", close);

    return (
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    );
}
