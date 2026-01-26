import {ReactElement} from "react";

export type AppManifest = {
    key: string;
    name: string; // "Home"
    render: React.LazyExoticComponent<() => ReactElement>; // top level component.
    shortName?: string;
    description?: string;
    icon?: React.ReactNode;
    
    /* Optional settings */
    isHidden?: boolean; // if true, app will not show in the app overview.
};
