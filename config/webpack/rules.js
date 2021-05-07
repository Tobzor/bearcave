// deps
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// locals
import "../docs/docs";
import { rootPath, join } from "./root";

// react-refresh/babel for dev?

/**
 * Defines a ruleset for bundling TS code.
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule} Transpiler rules.
 */
function defineTranspiler(env) {
    let options = {
        cacheDirectory: true,
    };

    // FIXME: add react refresh.
    // Add react refresh in dev.
    // if (env === "dev") {
    //     options = {
    //         ...options,
    //         plugins: [
    //             ...(options.plugins ?? []),
    //             require.resolve("react-refresh/babel"),
    //         ].filter(Boolean),
    //     };
    // }

    return {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: [/node_modules/, /build/],
        use: {
            loader: "babel-loader",
            options,
        },
    };
}

/**
 * Defines RuleSetRule for bundling markup.
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule} Markup bundling rules.
 */
function defineMarkup(env) {
    return {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: {
                    minimize: env !== "dev",
                },
            },
        ],
    };
}

/**
 * Defines a RulesetRule for bundling styles.
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule} Moduled css bundling rules.
 */
function defineStyles(env) {
    return {
        test: /\.(css)$/,
        include: [join(rootPath, "/src")],
        use: [
            env === "dev"
                ? { loader: "style-loader" }
                : { loader: MiniCssExtractPlugin.loader },
            {
                loader: "@teamsupercell/typings-for-css-modules-loader",
                options: {
                    banner:
                        "// AUTOGENERATED TYPINGS, these should not be edited.",
                    eol: "\n",
                },
            },
            { loader: "css-loader", options: { modules: true } },
        ],
    };
}

/**
 * Defines a RuleSetRule for bundling images.
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule} Image bundling rules.
 */
function defineImages(env) {
    return {
        test: /\.(png|jpg|gif|jpeg)$/,
        include: [join(rootPath, "/resources/images")],
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./resources/images/",
                },
            },
        ],
    };
}

/**
 * Defines a RuleSetRule for bundling icons.
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule} Icon bundling rules.
 */
function defineIcons(env) {
    return {
        test: /\.(svg)$/,
        include: [join(rootPath, "/resources/icons")],
        use: [
            { loader: "babel-loader" },
            {
                loader: "react-svg-loader",
                options: {
                    jsx: true,
                },
            },
        ],
    };
}

/**
 *
 * @param {ENV} env The build environment.
 * @returns {RuleSetRule[]} An ENV specific webpack module rule definition.
 */
export function defineModule(env) {
    const transpiler = defineTranspiler(env);
    const markup = defineMarkup(env);
    const styles = defineStyles(env);
    const images = defineImages(env);
    const icons = defineIcons(env);

    return {
        rules: [transpiler, markup, styles, images, icons],
    };
}
