// deps
import React from "react";
// locals
import { registerCaveApp } from "@utils";

const Trippin: React.FC = () => {
    return <div>tripping</div>;
};

registerCaveApp({
    key: "trippin",
    name: "Trippin",
    render: Trippin,
});
