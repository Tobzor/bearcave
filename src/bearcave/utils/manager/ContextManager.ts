// deps
import { History } from "history";
// locals
import { useBearcave } from "../core/BearcaveContext";

type ContextConstructor = {
    history: History;
};

class ContextManager {
    public static Instance: ContextManager;

    private history: History;
    private apps: AppManifest[] = [];

    constructor({ history }: ContextConstructor) {
        this.history = history;
        if (ContextManager.Instance) {
            throw new Error("An instance of ContextManager already exists.");
        }
        ContextManager.Instance = this;
    }

    getCurrentApp(): AppManifest["render"] {
        const path = this.history.location.pathname;
        // TODO: resolve app from path
        const appName = "Home";
        const app = this.apps.find((app) => app.name === appName);

        if (app) {
            return app.render;
        }

        return () => null;
    }

    registerApp(app: AppManifest): void {
        if (this.apps.includes(app)) {
            // TODO: replace ?
        }

        this.apps.push(app);
    }
}

export type AppManifest = {
    name: string; // "Home"
    render: React.FC; // top level component.
    route?: string; // /apps/home --> defaults to lower case name.
};

function registerCaveApp(manifest: AppManifest): void {
    const contextManager = ContextManager.Instance;

    if (contextManager) {
        contextManager.registerApp(manifest);
    }
}

function useCurrentApp(): AppManifest["render"] {
    const { managers } = useBearcave();

    return managers.context.getCurrentApp();
}

export default ContextManager;
export { registerCaveApp, useCurrentApp };
