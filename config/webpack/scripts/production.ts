import { Configuration } from "webpack";
import baseConfig from "./base.config";
import { cleanProd, uglify, compressImages } from "../plugins";
import { optimization } from "../optimization";

// Export environment settings
const config: Configuration = {
    ...baseConfig,
    mode: "production",
    plugins: [...baseConfig.plugins, cleanProd, uglify, compressImages],
    optimization,
};

export default config;
