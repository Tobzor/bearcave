// locals
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import "../docs/docs";

/**
 * Defines a webpack optimization config object.
 * @param {ENV} env The build environment.
 * @returns {WebpackOptimization} Defined webpack optimization.
 */
export function defineOptimization(env) {
    let minimizer = ["..."];
    if (env !== "dev") {
        minimizer = [new CssMinimizerPlugin(), ...minimizer];
    }

    return {
        runtimeChunk: "single",
        moduleIds: "deterministic",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                bearcave: {
                    test: /[\\/]src[\\/]bearcave[\\/]/,
                    name: "bearcave",
                    chunks: "all",
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "node_vendors",
                    chunks: "all",
                },
            },
        },
        minimize: env !== "dev",
        minimizer,
    };
}
