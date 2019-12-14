// Deps
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// Locals
import { devServerOptions } from "../server";
import baseConfig from "./base.config";

/**
 * Define other dev-related webpack stuff here
 */
const hot = new HtmlWebpackPlugin({ title: "Hot Module Replacement" });

let config: Configuration = {
    ...baseConfig,
    mode: "development",
    plugins: [...baseConfig.plugins, hot],
    devServer: devServerOptions,
    devtool: "eval-source-map",
};
export default config;
