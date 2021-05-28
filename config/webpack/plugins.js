// deps
import Dotenv from "dotenv-webpack";
// locals
import "../docs/docs";
import EnvPaths from "../environments/environmentPaths";
import { rootPath, join } from "./root";

import HtmlWebpackPlugin from "html-webpack-plugin";
const htmlWebPackPlugin = new HtmlWebpackPlugin({
    publicPath: "/",
    template: "./config/templates/index.html",
    filename: "index.html",
    favicon: join(rootPath, "/resources/favicon/favicon.png"),
});

import MiniCssExtractPlugin from "mini-css-extract-plugin";
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
});

import FaviconsWebpackPlugin from "favicons-webpack-plugin";
const faviconsManifest = new FaviconsWebpackPlugin({
    logo: join(rootPath, "/resources/favicon/favicon.png"), // svg works too!
    mode: "webapp", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
    devMode: "light", // optional can be 'webapp' or 'light' - 'light' by default
    publicPath: "/",
    cache: true,
    prefix: "static/",
    favicons: {
        appName: "Bearcave",
        appShortName: "bearcave",
        appDescription: "Bearcave PWA awesomeness",
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        appleStatusBarStyle: "black-translucent",
        orientation: "any",
        icons: {
            // mobiles
            android: true,
            appleIcon: true,
            appleStartup: true,
            // browsers
            favicons: true,
            coast: false,
            firefox: false,
            yandex: false,
            // other
            windows: false,
        },
    },
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

import { VueLoaderPlugin } from "vue-loader";
const vueLoaderPlugin = new VueLoaderPlugin();

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
        faviconsManifest,
        ignoreTypings,
        miniCssExtractPlugin,
        vueLoaderPlugin,
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
