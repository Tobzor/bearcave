/**
 * Defines options for the webpack dev server middleware.
 */
module.exports = function defineDevServer() {
    return {
        port: 1337,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        stats: "errors-only",
        noInfo: true,
    };
};
