// locals
import { Header, NavItem, ItemGroup } from "@components";
import styles from "./styles.css";
import { Work } from "./work/Work";
import { Education } from "./education/Education";
import { PastProjects } from "./projects/Projects";

function Home(): JSX.Element {
    return (
        <>
            <Header>
                {/* Removed apps from homepage until it can be fine tuned/styled */}
                {/* <NavItem linkTo="/apps">Apps</NavItem> */}
            </Header>
            <div className={styles.container}>
                <ItemGroup title="Experience">
                    <Work />
                    <Education />
                </ItemGroup>
                {/* <ItemGroup title={"Projects"}>
                    <PastProjects />
                </ItemGroup> */}
            </div>
        </>
    );
}

export default Home;
