import { join } from "path";
import { Resolve } from "webpack";

/**
 * Defines default resolved extensions and aliases, both used in ESM imports.
 * @param rootPath - The root of the webserver.
 */
export const defineResolves = function (rootPath: string): Resolve {
    if (!rootPath) return {};
    return {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less"],
        alias: {
            "@icons": join(rootPath, "/resources/icons"),
            "@images": join(rootPath, "/resources/images"),
            "@fonts": join(rootPath, "/resources/fonts"),
            "@utils": join(rootPath, "/src/bearcave/utils"),
            "@components": join(rootPath, "/src/bearcave/components"),
            "@types": join(rootPath, "/src/bearcave/types"),
            "@mediaqueries": join(rootPath, "/src/bearcave/styles/mediaqueries.less"),
            "@less-variables": join(rootPath, "/src/bearcave/styles/variables.less"),
        },
    };
};
