import React from "react";
import { render } from "react-dom";

import styles from "./shiny.less";

// will initialize the wrapper that renders each app.
const start = async () => {
    const Root = () => {
        return <div className={styles.container}>THIS IS SHINY, RIGHT?</div>;
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully"))
    .catch(e => console.error(e));
