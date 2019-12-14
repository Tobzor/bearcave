import { RuleSetRule, Module } from "webpack";
import path from "path";

const rootPath = path.resolve(__dirname, "../../");
export const baseExclude = [/node_modules/, /build/];

const transpiler: RuleSetRule = {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: baseExclude,
    loader: "babel-loader",
    query: {
        cacheDirectory: true,
    },
};

const html: RuleSetRule = {
    test: /\.html$/,
    use: [{ loader: "html-loader" }],
};

const style: RuleSetRule = {
    test: /\.less$/,
    include: [path.join(rootPath, "/src")],
    use: [
        { loader: "style-loader" },
        {
            loader: "css-loader",
            options: {
                sourceMap: true,
                modules: true,
            },
        },
        { loader: "less-loader", options: { rewriteUrls: "local" } },
    ],
};

const images: RuleSetRule = {
    test: /\.(png|jpg|gif|jpeg)$/,
    include: [path.join(rootPath, "/resources/images")],
    use: [
        {
            loader: "cache-loader",
        },
        {
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath: "./resources/images/",
            },
        },
    ],
};

const icons: RuleSetRule = {
    test: /\.svg$/,
    use: [
        {
            loader: "@svgr/webpack",
            options: {
                native: false,
            },
        },
        { loader: "url-loader" },
    ],
};

const fonts: RuleSetRule = {
    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    include: [path.join(rootPath, "/resources/fonts")],
    use: [
        {
            loader: "file-loader",
            options: {
                outputPath: "resources/fonts/",
                name: "[name].[ext]",
            },
        },
    ],
};

/**
 * Export as module
 */
const baseRules: Module = { rules: [transpiler, html, style] };
export default baseRules;

/**
 * Export rule as standalone modules
 */
export { transpiler };
export { html };
export { style };
export { images };
export { icons };
export { fonts };
