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
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minSize: 0,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
                bearcave: {
                    test: /[\\/]src[\\/]bearcave[\\/]/,
                    minSize: 0,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]src[\\/]bearcave[\\/](.*?)([\\/]|$)/,
                        )[1];

                        return `bearcave/${packageName.replace("@", "")}`;
                    },
                },
            },
        },
        minimize: env !== "dev",
        minimizer,
    };
}
