export type AppManifest = {
    key: string;
    name: string; // "Home"
    shortName?: string;
    description?: string;
    icon?: string;
    render: React.ComponentType; // top level component.
};
