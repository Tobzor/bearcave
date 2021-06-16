import React from "react";

export type AppManifest = {
    key: string;
    name: string; // "Home"
    render: () => JSX.Element; // top level component.
    shortName?: string;
    description?: string;
    icon?: React.ReactNode;
};
