import { Link } from "react-router-dom";
// locals
import bearsplash from "@assets/images/bear.png";

import styles from "./styles.module.css";

function NavLogo(): JSX.Element {
    return (
        <Link to="/" className={styles.navLogo}>
            <img src={bearsplash} alt="logo" />
            <h3>Bearcave</h3>
        </Link>
    );
}

export { NavLogo };
