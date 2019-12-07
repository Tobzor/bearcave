// Deps
import { Configuration, Resolve, Plugin, Output, Module } from "webpack";
import webpack from "webpack";
import path from "path";
// Locals
import baseRules from "../rules";
import { basePlugins } from "../plugins";

interface BaseConfig extends Configuration {
    entry: string;
    module: Module;
    resolve: Resolve;
    output: Output;
    plugins: Plugin[];
}

export const rootPath = path.resolve(__dirname, "../../../");

/**
 * Define any general webpack options that should be relevant for all enviroments
 */

const resolve: Resolve = {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
};
const output: webpack.Output = {
    path: path.join(rootPath, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
};

const baseConfig: BaseConfig = {
    entry: path.join(rootPath, "src", "index.tsx"),
    resolve,
    output,
    module: baseRules,
    plugins: basePlugins,
};

export default baseConfig;
