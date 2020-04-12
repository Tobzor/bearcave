import { Configuration } from "webpack-dev-server";

/**
 * Defines options for the webpack dev server middleware.
 */
export const defineDevServer = (): Configuration => ({
    port: 1337,
    hot: true,
    historyApiFallback: {
        disableDotRule: true,
    },
    stats: "errors-only",
    noInfo: true,
});
