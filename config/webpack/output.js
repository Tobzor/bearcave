const { join } = require("./root");

/**
 * Defines how webpack outputs bundled files.
 * @param rootPath - the root path of the webserver.
 * @param env - the stringified environment name.
 */
module.exports = function defineOutput(rootPath) {
    return {
        path: join(rootPath, "build"),
        publicPath: "/",
        filename: "[name].[contenthash].js",
    };
};
