const Dotenv = require("dotenv-webpack");
const { uglify } = require("../plugins");
const optimization = require("../optimization");
const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
/**
 * Define other prod-related webpack options here
 */
const environmentPlugin = new Dotenv({
    path: EnvPaths.prod,
});

// Export environment settings
const config = {
    ...baseConfig,
    plugins: [...baseConfig.plugins, environmentPlugin, uglify],
    optimization,
};

module.exports = config;
