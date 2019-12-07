import { Configuration } from "webpack";
import baseConfig from "./base.config";

// Export environment settings
const config: Configuration = {
    ...baseConfig,
    mode: "production",
    module: baseConfig.module,
    resolve: baseConfig.resolve,
};

export default config;
