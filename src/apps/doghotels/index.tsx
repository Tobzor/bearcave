// deps
import { lazy } from "react";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.

const DogHotels = lazy(() => import("./DogHotels"));

registerCaveApp({
    key: "doghotels",
    name: "DogHotels",
    render: DogHotels,
    icon: <div>🐶🏨</div>,
    isHidden: false
});
