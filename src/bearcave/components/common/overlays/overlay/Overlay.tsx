import { WithChildren } from "@types";
import { classnames } from "@utils";

import styles from "./styles.module.css";

type OverlayProps = WithChildren<{
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}>;
export function Overlay({
    className,
    onClick,
    children,
}: OverlayProps): JSX.Element {
    const containerStyles = classnames(styles.container, className);
    return (
        <div className={containerStyles} onClick={onClick}>
            {children}
        </div>
    );
}
