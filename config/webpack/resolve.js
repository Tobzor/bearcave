// locals
import "../docs/docs";
import { join } from "./root";

/**
 * Defines default resolved extensions and aliases, both used in ESM imports.
 * @param {string} rootPath The root of the webserver.
 * @returns {WebpackResolve} Webpack resolve extensions and aliases.
 * @throws Error
 */
export function defineResolve(rootPath) {
    if (!rootPath) {
        throw new Error(
            "No rootpath received in defineResolves for webpack config.",
        );
    }

    return {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
        alias: {
            "@utils": join(rootPath, "/src/bearcave/utils"),
            "@components": join(rootPath, "/src/bearcave/components"),
            "@css": join(rootPath, "/src/bearcave/styles"),
            "@types": join(rootPath, "/src/bearcave/types"),
            "@images": join(rootPath, "/resources/images"),
            "@icons": join(rootPath, "/resources/icons"),
            "@locales": join(rootPath, "/resources/locales"),
            "@resources": join(rootPath, "/resources"),
        },
    };
}
