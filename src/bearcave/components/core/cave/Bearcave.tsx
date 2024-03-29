// locals
import { WithChildren } from "@types";
import { Footer } from "@components";
import { usePWA } from "@utils";

// bearcave global css/theme things
import "@css/variables.css";
import "@css/mixins.css";

// local styling for cave
import styles from "./styles.module.css";

type BearcaveProps = WithChildren<unknown>;

function BearcaveRoot({ children }: BearcaveProps): JSX.Element {
    usePWA();

    return (
        <>
            <div id="cave-root" className={styles.root}>
                <main className={styles.content}>{children}</main>
                <Footer />
            </div>
            <div id="dialog-root" className={styles.dialog}></div>
        </>
    );
}

export { BearcaveRoot };
