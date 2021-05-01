// deps
import React from "react";
import { Route, Routes } from "react-router";
// locals
import { BearcaveNav, NavItem } from "@components";

import styles from "./styles.css";
import Work from "./work/Work";
import Education from "./education/Education";
import PastProjects from "./projects/Projects";

function Home(): JSX.Element {
    return (
        <div className={styles.container}>
            <BearcaveNav>
                <NavItem linkTo="/apps">Apps</NavItem>
            </BearcaveNav>

            <div>
                <Work />
                <Education />
                <PastProjects />
            </div>
        </div>
    );
}

export default Home;
