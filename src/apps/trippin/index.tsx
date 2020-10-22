// deps
import React from "react";
// locals
import { registerCaveApp } from "@utils";

const Trippin: React.FC = () => {
    return <div>tripping</div>;
};

export default function register(): void {
    registerCaveApp({
        name: "Trippin",
        render: Trippin,
    });
}
