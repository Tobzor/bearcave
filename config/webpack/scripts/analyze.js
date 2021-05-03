const { bundleAnalyzer } = require("../plugins");
const prodConfig = require("./production");

// Export environment settings
const config = {
    ...prodConfig,
    plugins: [...prodConfig.plugins, bundleAnalyzer],
};

module.exports = config;
