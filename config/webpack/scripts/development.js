const Dotenv = require("dotenv-webpack");
const { rootPath } = require("../root");
const defineOutput = require("../output");
const defineDevServer = require("../../server/devServer");
const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
/**
 * Define other dev-related webpack stuff here
 */

const environmentPlugin = new Dotenv({
    path: EnvPaths.test,
});

const config = {
    ...baseConfig,
    plugins: [...baseConfig.plugins, environmentPlugin],
    devServer: defineDevServer(),
    devtool: "source-map",
    output: defineOutput(rootPath),
};

module.exports = config;
