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
        splitChunks: {
            chunks: "all",
            // FIXME: is this needed?
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
        minimize: env !== "dev",
        minimizer,
    };
}
