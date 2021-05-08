// deps
import Dotenv from "dotenv-webpack";
// locals
import "../docs/docs";
import EnvPaths from "../environments/environmentPaths";
import { rootPath, join } from "./root";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
const cleanWebpackPlugin = new CleanWebpackPlugin();

import HtmlWebpackPlugin from "html-webpack-plugin";
const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: "./config/templates/index.html",
    filename: "index.html",
});

import MiniCssExtractPlugin from "mini-css-extract-plugin";
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
});

import CopyWebpackPlugin from "copy-webpack-plugin";
const copyWebpackPlugin = new CopyWebpackPlugin({
    patterns: [
        {
            // manifest.json moved to build
            from: join(rootPath, "/resources/pwa"),
            to: join(rootPath, "/build"),
        },
    ],
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
        cleanWebpackPlugin,
        copyWebpackPlugin,
        htmlWebPackPlugin,
        ignoreTypings,
        progressReport,
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
