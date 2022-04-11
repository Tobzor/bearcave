import { Link } from "react-router-dom";
// locals
import { bearsplash } from "@images";
import styles from "./styles.css";

function NavLogo(): JSX.Element {
    return (
        <Link to="/" className={styles.navLogo}>
            <img src={bearsplash} alt="logo" />
            <h3>bearcave</h3>
        </Link>
    );
}

export { NavLogo };
