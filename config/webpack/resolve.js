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
            "@resources": join(rootPath, "/resources"),
            "@icons": join(rootPath, "/resources/icons"),
            "@images": join(rootPath, "/resources/images"),
            "@fonts": join(rootPath, "/resources/fonts"),
            "@locales": join(rootPath, "/resources/locales"),
            "@utils": join(rootPath, "/src/bearcave/utils"),
            "@components": join(rootPath, "/src/bearcave/components"),
            "@types": join(rootPath, "/src/bearcave/types"),
            "@apps": join(rootPath, "/src/apps"),
            "@css": join(rootPath, "/src/bearcave/styles/variables.css"),
        },
    };
};
