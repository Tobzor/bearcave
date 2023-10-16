// Locals
import App from "./bearcave/app";
import { createFirebase } from "./config";

async function start(): Promise<void> {
    // Ensure we have firebase up and running
    createFirebase();

    /**
     * We dynamically import all index files under apps/* to include in bundle
     * //TODO: can this be done via vite config instead?
     */
    const appModules = import.meta.glob("./apps/**/index.tsx");
    for (const appPath in appModules) {
        await appModules[appPath]();
    }

    const container = document.getElementById("root");
    if (container) {
        App(container);
    } else {
        throw new Error("Bearcave failed to create root");
    }
}

start()
    .then(() => console.log("Bearcave started successfully!"))
    .catch((e) => console.error(e));
