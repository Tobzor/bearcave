// deps
import React from "react";
// locals
import { registerCaveApp } from "@utils";

function Trippin(): JSX.Element {
    return <div>tripping</div>;
}

registerCaveApp({
    key: "trippin",
    name: "Trippin",
    render: Trippin,
});
