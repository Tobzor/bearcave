export type AppManifest = {
    key: string;
    name: string; // "Home"
    app: React.ComponentType; // top level component.
    shortName?: string;
    description?: string;
    icon?: React.ComponentType | string;
};
