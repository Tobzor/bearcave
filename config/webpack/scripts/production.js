const Dotenv = require("dotenv-webpack");
const { miniCssExtractPlugin } = require("../plugins");
const { prodStyles } = require("../rules");
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
    module: {
        ...baseConfig.module,
        rules: [...baseConfig.module.rules, prodStyles],
    },
    plugins: [
        ...baseConfig.plugins,
        environmentPlugin,
        // extracts styles into css files.
        miniCssExtractPlugin,
    ],
    optimization,
};

module.exports = config;
