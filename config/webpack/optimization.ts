import { Options } from "webpack";

// Splits npm packages to a chunk vendor.
const optimization: Options.Optimization = {
    // Split node_modules to seperate bundle.
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
            },
        },
    },
    // Prevent vendor bundle refresh due to module id changes.
    moduleIds: "hashed",
};

export { optimization };
