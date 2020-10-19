// Webpack third party plugins
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// minification
const TerserPlugin = require("terser-webpack-plugin");
const { WatchIgnorePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");

// Webpack first party plugins

// Utils
/** Handles the templating of index.html */
const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: "./config/templates/index.html",
    filename: "./index.html",
    favicon: "./resources/favicon_io/favicon.ico",
});

const cleanBuildPlugin = new CleanWebpackPlugin();

// Minify prod code
const uglify = new TerserPlugin({
    include: new RegExp("/build"),
});

const bundleAnalyzer = new BundleAnalyzerPlugin();

// Currently ignores all typings being autogenerated for less modules.
const ignoreTypings = new WatchIgnorePlugin({ paths: [/less\.d\.ts$/] });

// Custom bundling stats.
const progressReport = new WebpackBar({
    name: "bearcave",
    color: "#007079",
    profile: true,
});

// Export all plugins which are used in all environments.
module.exports = {
    htmlWebPackPlugin,
    ignoreTypings,
    uglify,
    bundleAnalyzer,
    defineBasePlugins: function () {
        return [cleanBuildPlugin, htmlWebPackPlugin, progressReport];
    },
};
