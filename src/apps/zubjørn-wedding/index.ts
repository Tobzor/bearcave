import { lazy } from "react";

import { registerCaveApp } from "@utils";

const ZuBearWedding = lazy(() => import("./ZuBearWedding"));

registerCaveApp({
    key: "zubjørn-wedding",
    name: "ZuBjørn Bryllup",
    render: ZuBearWedding,
});
