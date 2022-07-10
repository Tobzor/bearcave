// deps
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
// locals
import { Breadcrumbs, ItemGroup, Item } from "@components";
import { useRegisteredApps } from "@utils";

import styles from "./styles.css";

function AppBrowser(): JSX.Element {
    const apps = useRegisteredApps();

    const appItems = useMemo(() => {
        return apps.map((app) => (
            <Link className={styles.appItems} key={app.key} to={app.key}>
                <Item
                    src={app.icon}
                    description={app.description ?? ""}
                    title={app.name ?? app.shortName ?? app.key ?? ""}
                />
            </Link>
        ));
    }, [apps]);

    return (
        <>
            <Breadcrumbs />
            <div className={styles.appBrowserContainer}>
                {appItems && <ItemGroup>{appItems}</ItemGroup>}
            </div>
        </>
    );
}

export { AppBrowser };
