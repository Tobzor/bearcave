// deps
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
// locals
import { combineUrls } from "@utils";

import styles from "./styles.css";

function Breadcrumbs(): JSX.Element {
    const breadCrumbs = useMemo(() => {
        const crumbs = window.location.pathname
            .split("/")
            .filter(Boolean)
            .reduce(
                (acc, curr) => {
                    let url = acc[acc.length - 1] + "/" + curr;

                    if (acc.length === 1) {
                        url = acc[acc.length - 1] + curr;
                    }

                    acc.push(url);
                    return acc;
                },
                ["/"] as string[],
            );
        return crumbs.map((crumb) => (
            <Link key={crumb} to={crumb}>
                {crumb}
            </Link>
        ));
    }, [window.location.pathname]);

    return (
        <div className={styles.container}>
            {/* <Button onClick={() => navigate("/")}>{"< Back"}</Button> */}
            {breadCrumbs}
        </div>
    );
}

export default Breadcrumbs;
