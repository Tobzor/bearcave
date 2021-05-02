// deps
import React from "react";
// locals
import { BearcaveNav, NavItem, ItemGroup } from "@components";
import styles from "./styles.css";
import Work from "./work/Work";
import Education from "./education/Education";
import PastProjects from "./projects/Projects";

function Home(): JSX.Element {
    return (
        <>
            <BearcaveNav>
                <NavItem linkTo="/apps">Apps</NavItem>
            </BearcaveNav>
            <div className={styles.container}>
                <ItemGroup>
                    <Work />
                    <Education />
                    <PastProjects />
                </ItemGroup>
            </div>
        </>
    );
}

export default Home;
