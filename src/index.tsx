import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";

const _App = () => <div>SHINY</div>;
const App = hot(module)(_App);

// will initialize the wrapper that renders each app.
const start = async () => {
    const Root = () => {
        return (
            <div>
                <App />
            </div>
        );
    };

    render(<Root />, document.getElementById("root"));
};

start()
    .then(() => console.log("Bearcave started successfully"))
    .catch(e => console.error(e));
