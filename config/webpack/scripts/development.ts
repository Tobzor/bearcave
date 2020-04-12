import { defineOutput } from "./../output";
import { defineDevServer } from "../../server/devServer";

import { Configuration } from "webpack";
import Dotenv from "dotenv-webpack";

import { rootPath } from "../root";
import { EnvPaths } from "../../environments/environmentPaths";

import baseConfig from "./base";
/**
 * Define other dev-related webpack stuff here
 */

const environmentPlugin = new Dotenv({
    path: EnvPaths.test,
});

let config: Configuration = {
    ...baseConfig,
    module: baseConfig.module,
    resolve: baseConfig.resolve,
    plugins: [...baseConfig.plugins, environmentPlugin],
    devServer: defineDevServer(),
    devtool: "source-map",
    output: defineOutput(rootPath),
};
export default config;
