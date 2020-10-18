import { uglify, bundleAnalyzer } from "../plugins";
import { optimization } from "../optimization";

const Dotenv = require("dotenv-webpack");

const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
/**
 * Define other test-related webpack options here
 */
const environmentPlugin = new Dotenv({
    path: EnvPaths.prod,
});

// Export environment settings
const config = {
    ...baseConfig,
    module: baseConfig.module,
    resolve: baseConfig.resolve,
    plugins: [...baseConfig.plugins, environmentPlugin, uglify, bundleAnalyzer],
    optimization: optimization,
};

module.exports = config;
