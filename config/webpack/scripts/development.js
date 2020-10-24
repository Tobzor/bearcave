const Dotenv = require("dotenv-webpack");
const { rootPath } = require("../root");
const defineOutput = require("../output");
const defineDevServer = require("../../server/devServer");
const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
const { devStyles } = require("../rules");
const { ignoreTypings } = require("../plugins");
/**
 * Define other dev-related webpack stuff here
 */

const environmentPlugin = new Dotenv({
    path: EnvPaths.test,
});

const config = {
    ...baseConfig,
    module: {
        ...baseConfig.module,
        rules: [...baseConfig.module.rules, devStyles],
    },
    plugins: [...baseConfig.plugins, environmentPlugin, ignoreTypings],
    devServer: defineDevServer(),
    devtool: "source-map",
    output: defineOutput(rootPath),
};

module.exports = config;
