import glob from "glob";
import { join, parse } from "./root";

/**
 * Defines a webpack entry object.
 * @param {string} rootPath The root of the webserver.
 * @returns {WebpackEntry} Webpack entry bundles.
 * @throws Will throw an error if either argument is undefined or empty.
 */
export function defineEntry(rootPath, appsPath) {
    if (!rootPath || !appsPath) {
        throw new Error(
            "No rootPath: '",
            rootPath,
            "' or appsPath: '",
            appsPath,
            "' provided in defineEntry.",
        );
    }

    return {
        main: join(rootPath, "/src/index.tsx"),
        homepage: join(rootPath, "/src/homepage/index.tsx"),
        ...glob.sync(join(rootPath, appsPath)).reduce(function (acc, app) {
            const appName = parse(app).dir.split("/").pop();
            acc["apps/" + appName] = app;
            return acc;
        }, {}),
    };
}
