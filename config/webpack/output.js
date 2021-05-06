// locals
import "../docs/docs";
import { join } from "./root";

/**
 * Defines how webpack outputs bundles files.
 * @param {string} rootPath The root path of the webserver.
 * @returns {WebpackOutput} Defined webpack output.
 * @throws Will throw an error if argument is undefined.
 */
export function defineOutput(rootPath) {
    if (!rootPath) {
        throw new Error("No rootpath provided in defineOutput.");
    }
    return {
        path: join(rootPath, "build"),
        publicPath: "/",
        filename: function (data) {
            if (data.chunk.name === "main") {
                return "bundle/[name].[contenthash].js";
            }

            // had to add "bearcave" (dependency for my /apps) as a default vendor
            // else there was not generated a name... ??
            if (data.chunk.name && data.chunk.name.includes("apps")) {
                const appName = data.chunk.name.split("/").pop();
                return "bundle/apps/" + appName + ".[contenthash].js";
            }

            // assume it is vendor things
            return "vendor/[name].[contenthash].js";
        },
    };
}
