import { Options } from "webpack";

const optimization: Options.Optimization = {
    runtimeChunk: "single",
    splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    return module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                },
            },
        },
    },
};

export { optimization };
