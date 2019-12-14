// Deps
import { Configuration, Resolve, Plugin, Output, Module } from "webpack";
import path from "path";
// Locals
import baseRules from "../rules";
import { basePlugins } from "../plugins";

interface BaseConfig extends Configuration {
    module: Module;
    resolve: Resolve;
    plugins: Plugin[];
    output: Output;
}

const rootPath = path.resolve(__dirname, "../../../");

/**
 * Define any general webpack options that should be relevant for all enviroments
 */

const resolve: Resolve = {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
        "@bearcave/core": path.join(rootPath, "src/bearcave"),
    },
};

const output: Output = {
    path: path.join(rootPath, "build"),
    publicPath: "/",
    filename: "[name].[hash].js",
};

const baseConfig: BaseConfig = {
    resolve,
    output,
    module: baseRules,
    plugins: basePlugins,
};

export default baseConfig;
