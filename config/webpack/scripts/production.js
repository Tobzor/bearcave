const Dotenv = require("dotenv-webpack");
const { miniCssExtractPlugin } = require("../plugins");
const { prodStyles } = require("../rules");
const optimization = require("../optimization");
const EnvPaths = require("../../environments/environmentPaths");
const baseConfig = require("./base");
/**
 * Define other prod-related webpack options here
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const environmentPlugin = new Dotenv({
    path: EnvPaths.prod,
});

// Export environment settings
const config = {
    ...baseConfig,
    mode: "production",
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
    optimization: {
        ...optimization,
        minimize: true,
        minimizer: ["...", new CssMinimizerPlugin()],
    },
};

module.exports = config;
