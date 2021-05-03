const { join, rootPath } = require("./root");

module.exports = function defineOutput(path = rootPath) {
    return {
        path: join(path, "build"),
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
};
