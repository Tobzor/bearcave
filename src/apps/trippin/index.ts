// deps
import { lazy } from "react";

// locals
import { registerCaveApp } from "@utils";

const Trippin = lazy(() => import("./Trippin"));

registerCaveApp({
    key: "trippin",
    name: "Trippin",
    render: Trippin,
});
