// deps
import React, { useEffect } from "react";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.

function Todo(): JSX.Element {
    useEffect(() => {
        // could do things
    }, []);

    return <div>TODO</div>;
}

registerCaveApp({
    key: "todo",
    name: "Todo",
    render: Todo,
});
