const { join } = require("./root");

/**
 * Defines default resolved extensions and aliases, both used in ESM imports.
 * @param rootPath - The root of the webserver.
 */
module.exports = function defineResolves(rootPath) {
    if (!rootPath) return {};
    return {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".png"],
        alias: {
            "@utils": join(rootPath, "/src/bearcave/utils"),
            "@components": join(rootPath, "/src/bearcave/components"),
            "@css": join(rootPath, "/src/bearcave/styles"),
            "@types": join(rootPath, "/src/bearcave/types"),
            "@images": join(rootPath, "/resources/images"),
            "@icons": join(rootPath, "/resources/icons"),
            "@locales": join(rootPath, "/resources/locales"),
            "@resources": join(rootPath, "/resources"),
            "@fonts": join(rootPath, "/resources/fonts"),
        },
    };
};
