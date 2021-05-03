const baseConfig = require("./base");
const { prodStyles } = require("../rules");
const { miniCssExtractPlugin, bundleAnalyzer } = require("../plugins");
const defineOutput = require("../output");
const optimization = require("../optimization");

/**
 * Define other prod-related webpack options here
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const EnvPaths = require("../../environments/environmentPaths");
const Dotenv = require("dotenv-webpack");
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
        miniCssExtractPlugin,
        bundleAnalyzer,
    ],
    output: defineOutput(),
    optimization: {
        ...optimization,
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), "..."],
    },
};

module.exports = config;
