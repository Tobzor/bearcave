import "../docs/docs";

/**
 * Defines options for the webpack dev server middleware.
 * @returns {WebpackDevServer} Dev server config object.
 */
export function defineDevServer() {
    return {
        port: 1337,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
            index: "/",
        },
        stats: "errors-only",
        noInfo: true,
        writeToDisk: true,
    };
}
