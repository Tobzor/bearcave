import { Configuration } from "webpack";
import baseConfig from "./base.config";
import { cleanProd, uglify, compressImages, bundleAnalyzer } from "../plugins";

/**
 * Define other test-related webpack options here
 */

// Export environment settings
const config: Configuration = {
    ...baseConfig,
    module: baseConfig.module,
    resolve: baseConfig.resolve,
    plugins: [...baseConfig.plugins, cleanProd, uglify, compressImages, bundleAnalyzer],
};

export default config;
