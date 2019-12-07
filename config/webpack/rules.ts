import { RuleSetRule, Module } from "webpack";

const baseExclude = [/node_modules/, /dist/];

const transpiler: RuleSetRule = {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: baseExclude,
    loader: "babel-loader",
    query: {
        cacheDirectory: true,
    },
};

const style: RuleSetRule = {
    test: /\.less$/,
    use: [
        { loader: "style-loader" },
        {
            loader: "css-loader",
            options: {
                sourceMap: true,
                modules: true,
                localIndentName: "[local]__[hash:base64:5]",
            },
        },
        { loader: "less-loader" },
    ],
};

/**
 * Export as module
 */
const baseRules: Module = { rules: [transpiler, style] };
export default baseRules;

/**
 * Export rule as standalone modules
 */
export { transpiler, style };
