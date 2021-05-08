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
            if (data.chunk.name) {
                if (
                    ["main", "bearcave", "apps"].some((str) =>
                        data.chunk.name.includes(str),
                    )
                ) {
                    return "bundle/[name].[contenthash].js";
                }

                if (data.chunk.name.includes("npm")) {
                    return "vendor/[name].[contenthash].js";
                }
            }

            return "common/[name].[contenthash].js";
        },
    };
}
