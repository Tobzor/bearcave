// deps
import Dotenv from "dotenv-webpack";
// locals
import "../docs/docs";
import EnvPaths from "../environments/environmentPaths";
import { rootPath, join } from "./root";

import HtmlWebpackPlugin from "html-webpack-plugin";
const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: "./config/templates/index.html",
    filename: "index.html",
    favicon: join(rootPath, "/resources/favicon/favicon.png"),
});

import MiniCssExtractPlugin from "mini-css-extract-plugin";
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
});

import WebpackPWAManifest from "webpack-pwa-manifest";
const pwaManifestPlugin = new WebpackPWAManifest({
    name: "Bearcave",
    short_name: "bearcave",
    description: "Bearcave PWA awesomeness",
    display: "standalone",
    start_url: "/",
    publicPath: "./",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
        {
            src: join(rootPath, "/resources/favicon/favicon.png"),
            // multiple sizes
            sizes: [192, 512],
        },
    ],
});

import WorkboxPlugin from "workbox-webpack-plugin";
const workboxSWPlugin = new WorkboxPlugin.InjectManifest({
    swSrc: join(rootPath, "/config/templates/service-worker.js"),
});

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const bundleAnalyzer = new BundleAnalyzerPlugin();

import { WatchIgnorePlugin } from "webpack";
const ignoreTypings = new WatchIgnorePlugin({ paths: [/css\.d\.ts$/] });

import WebpackBar from "webpackbar";
const progressReport = new WebpackBar({
    name: "bearcave",
    color: "#007079",
    profile: true,
});

// import ReactRefreshWebpackPlugin from "react-refresh";
// const fastRefresh = new ReactRefreshWebpackPlugin();

/**
 * Export all plugins used across environments.
 * @returns {WebpackPlugin[]} Defined base plugins.
 */
export function defineBasePlugins() {
    return [
        progressReport,
        htmlWebPackPlugin,
        workboxSWPlugin,
        pwaManifestPlugin,
        ignoreTypings,
        miniCssExtractPlugin,
    ];
}

/**
 * Creates an array of webpack plugins that will be used in the build process.
 * @param {ENV} env The build environment.
 * @returns {WebpackPlugin[]} Defined plugins.
 * @throws Will throw an error if argument is undefined or not a matching env.
 */
export function definePlugins(env) {
    switch (env) {
        case "dev":
            return [
                ...defineBasePlugins(),
                new Dotenv({
                    path: EnvPaths.dev,
                }),
                // fastRefresh,
            ];
        case "test":
            return [
                ...defineBasePlugins(),
                new Dotenv({ path: EnvPaths.test }),
            ];
        case "analyze":
            return [
                ...defineBasePlugins(),
                new Dotenv({ path: EnvPaths.prod }),
                bundleAnalyzer,
            ];
        case "prod":
            return [
                ...defineBasePlugins(),
                new Dotenv({ path: EnvPaths.prod }),
            ];
        default:
            throw new Error("No matching ENV found in define plugins: ", env);
    }
}
