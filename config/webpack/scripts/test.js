const Dotenv = require("dotenv-webpack");
const optimization = require("../optimization");
const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
/**
 * Define other test-related webpack options here
 */
const environmentPlugin = new Dotenv({
    path: EnvPaths.test,
});

// Export environment settings
const config = {
    ...baseConfig,
    plugins: [...baseConfig.plugins, environmentPlugin],
    optimization,
    devtool: "eval-source-map",
};

module.exports = config;
