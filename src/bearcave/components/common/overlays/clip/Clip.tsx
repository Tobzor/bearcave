// deps
import { createPortal } from "react-dom";
// locals
import { useBearcave } from "@utils";
import { Overlay } from "@components";
import { WithChildren } from "@types";
import styles from "./styles.css";

type ClipProps = WithChildren<{
    show: boolean;
    close: () => void;
}>;

export function Clip({ show, close, children }: ClipProps): JSX.Element | null {
    const {
        refs: { dialog },
    } = useBearcave();

    if (!dialog.current || show === false) {
        return null;
    }

    function handleClickOutside() {
        close();
    }
    // TODO: add css transitiongroup and animate popping up from below.
    // display on desktop, tablet + mobile.

    return createPortal(
        <Overlay onClick={handleClickOutside}>
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </Overlay>,
        dialog.current,
    );
}
