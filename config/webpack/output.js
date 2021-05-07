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
        filename: function (data) {
            if (["main", "homepage"].includes(data.chunk.name)) {
                return "bundle/[name].[contenthash].js";
            }

            if (data.chunk.name) {
                if (data.chunk.name.includes("bearcave")) {
                    return "bundle/" + data.chunk.name + ".[contenthash].js";
                }

                if (data.chunk.name.includes("apps")) {
                    return "bundle/" + data.chunk.name + ".[contenthash].js";
                }
            }

            return "vendor/[name].[contenthash].js";
        },
    };
}
