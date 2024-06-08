// deps
import { lazy } from "react";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.

const BearFood = lazy(() => import("./BearFood"));

registerCaveApp({
    key: "bearfood",
    name: "BearFood",
    render: BearFood,
});
