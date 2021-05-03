// deps
import React from "react";
// locals
import { WithChildren } from "@types";

type ButtonProps = WithChildren<{
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}>;

function Button({ onClick, children }: ButtonProps): JSX.Element {
    return (
        <button onClick={onClick}>
            <span>{children}</span>
        </button>
    );
}

export default Button;
