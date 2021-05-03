// deps
import React from "react";
import { useNavigate } from "react-router";
// locals
import { Button } from "@components";

import styles from "./styles.css";

type BreadcrumbsProps = {};
function Breadcrumbs({}: BreadcrumbsProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Button onClick={() => navigate(-1)}>{"< Back"}</Button>
        </div>
    );
}

export default Breadcrumbs;
