import React from "react";

export type AppManifest = {
    key: string;
    name: string; // "Home"
    render: React.LazyExoticComponent<() => JSX.Element>; // top level component.
    shortName?: string;
    description?: string;
    icon?: React.ReactNode;
};
