import { lazy } from "react";

import { registerCaveApp } from "@utils";

const ZuzuCity = lazy(() => import("./ZuzuCity"));

registerCaveApp({
    key: "zuzu_city",
    name: "ZuzuCity",
    render: ZuzuCity,
});
