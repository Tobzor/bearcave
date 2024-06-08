// deps
import { lazy } from "react";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.

const Games = lazy(() => import("./Games"));

registerCaveApp({
    key: "games",
    name: "Games",
    render: Games,
});
