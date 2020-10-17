// deps
import React from "react";
// locals
import styles from "./styles.less";

type ContainerProps = {};
const Container = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ContainerProps>
>(({ children }, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            {children}
        </div>
    );
});

Container.displayName = "Container";

export default Container;
