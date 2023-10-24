// deps
import { lazy } from "react";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.

const Todo = lazy(() => import("./Todo"));

registerCaveApp({
    key: "todo",
    name: "Todo",
    render: Todo,
});
