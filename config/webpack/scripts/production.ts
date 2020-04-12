import { uglify, copyServer } from "../plugins";
import { optimization } from "../optimization";

import { Configuration } from "webpack";
import Dotenv from "dotenv-webpack";

import { EnvPaths } from "../../environments/environmentPaths";
import baseConfig from "./base";

/**
 * Define other test-related webpack options here
 */
const environmentPlugin = new Dotenv({
    path: EnvPaths.prod,
});

// Export environment settings
const config: Configuration = {
    ...baseConfig,
    module: baseConfig.module,
    resolve: baseConfig.resolve,
    plugins: [...baseConfig.plugins, environmentPlugin, copyServer, uglify],
    optimization: optimization,
};

export default config;
