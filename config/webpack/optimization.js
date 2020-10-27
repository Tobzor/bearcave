const optimization = {
    runtimeChunk: "single",
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                    )[1];
                    return `${packageName.replace("@", "")}`;
                },
            },
            bearcave: {
                test: /[\\/]src[\\/]bearcave[\\/]/,
                reuseExistingChunk: true,
                name: "bearcave",
            },
        },
    },
};

module.exports = optimization;
