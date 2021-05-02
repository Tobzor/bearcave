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
                {/* Removed apps from homepage until it can be fine tuned/styled */}
                {/* <NavItem linkTo="/apps">Apps</NavItem> */}
            </BearcaveNav>
            <div className={styles.container}>
                <ItemGroup title="Work and Education">
                    <Work />
                    <Education />
                </ItemGroup>
                <ItemGroup title="Projects">
                    <PastProjects />
                </ItemGroup>
            </div>
        </>
    );
}

export default Home;
