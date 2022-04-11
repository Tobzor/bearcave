import type { AppManifest } from "@types";
class AppContainer {
    public appsOverviewUrl = "/apps";
    private apps: AppManifest[] = [];

    getAllApps(): AppManifest[] {
        return this.apps;
    }

    getCurrentApp(appKey?: string): AppManifest | undefined {
        return appKey ? this.findApp(appKey) : undefined;
    }

    registerApp(app: AppManifest): void {
        const existing = this.apps.find((ea) => ea.key === app.key);

        if (existing) {
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
    }
}

const apps = new AppContainer();

async function registerCaveApp(manifest: AppManifest): Promise<void> {
    apps.registerApp(manifest);
}

export { AppContainer, apps, registerCaveApp };
export type { AppManifest };
