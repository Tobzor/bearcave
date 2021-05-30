// deps
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
// locals
import { capitalize } from "@utils";

import styles from "./styles.css";

function Breadcrumbs(): JSX.Element {
    const breadCrumbs = useMemo(() => {
        return window.location.pathname
            .split("/")
            .filter(Boolean)
            .reduce(
                (acc, curr) => {
                    const title = capitalize(curr);
                    let url = acc[acc.length - 1].url + "/" + curr;

                    if (acc.length === 1) {
                        url = acc[acc.length - 1].url + curr;
                    }

                    acc.push({ title, url });
                    return acc;
                },
                [{ title: "Home", url: "/" }] as Array<{
                    title: string;
                    url: string;
                }>,
            );
    }, [window.location.pathname]);

    return (
        <div className={styles.container}>
            {breadCrumbs.map((crumb, index) => {
                return (
                    <span key={index} className={styles.crumb}>
                        <Link key={crumb.url} to={crumb.url}>
                            {crumb.title}
                        </Link>

                        {index !== breadCrumbs.length - 1 && ">"}
                    </span>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;
