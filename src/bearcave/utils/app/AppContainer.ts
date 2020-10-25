type AppManifest = {
    key: string;
    name: string; // "Home"
    shortName?: string;
    description?: string;
    icon?: string;
    render: React.ComponentType; // top level component.
};

class AppContainer {
    private apps: AppManifest[] = [];

    constructor() {
        console.log("new app container");
    }

    getCurrentApp(): AppManifest | null {
        const path = window.location.pathname;

        switch (path) {
            case "/apps/trippin":
                return this.findApp("trippin");

            default:
                return this.findApp("home");
        }
    }

    registerApp(app: AppManifest): void {
        const existing = this.apps.find((ea) => ea.key === app.key);

        if (existing) {
            // TODO: handle if key exists? Update current?
            console.log("found existing manifest: ", existing);
            return;
        }

        this.apps.push(app);
    }

    private findApp(key: string) {
        const app = this.apps.find((app) => app.key === key);

        if (app) {
            return app;
        }

        return null;
    }
}

let appContainerInstance: AppContainer | null = null;
let appContainerPromise: Promise<AppContainer> | null = null;
let setAppContainerSingleton: ((appContainer: AppContainer) => void) | null;

function appContainerFactory(appContainer: AppContainer): void {
    appContainerInstance = appContainer;

    if (setAppContainerSingleton) {
        setAppContainerSingleton(appContainer);
        setAppContainerSingleton = null;
    }
}

async function getAppContainer(): Promise<AppContainer> {
    if (appContainerInstance) {
        return Promise.resolve(appContainerInstance);
    }

    if (appContainerPromise) {
        return appContainerPromise;
    }

    appContainerPromise = new Promise((resolve) => {
        setAppContainerSingleton = resolve;
    });

    return appContainerPromise;
}

async function registerCaveApp(manifest: AppManifest): Promise<void> {
    const container = await getAppContainer();
    container.registerApp(manifest);
}

export default AppContainer;
export type { AppManifest };
export { registerCaveApp, appContainerFactory };