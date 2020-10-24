const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const optimization = {
    runtimeChunk: "single",
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                    )[1];
                    return `npm.${packageName.replace("@", "")}`;
                },
            },
        },
    },
    minimize: true,
    minimizer: ["...", new CssMinimizerPlugin()],
};

module.exports = optimization;
