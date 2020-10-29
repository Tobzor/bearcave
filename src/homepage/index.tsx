// deps
import React from "react";
// locals
import { BearcaveNav } from "@components";

import styles from "./styles.css";
import Education from "./education/Education";
import PastProjects from "./projects/Projects";

function Home(): JSX.Element {
    return (
        <div className={styles.container}>
            <BearcaveNav />
            <Education />
            <PastProjects />
        </div>
    );
}

export default Home;
