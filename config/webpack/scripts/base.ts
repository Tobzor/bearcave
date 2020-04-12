import { rootPath } from "../root";

// Configuration definitions
import { defineOutput } from "../output";
import { defineResolves } from "../resolve";
import { defineBaseRules } from "../rules";
import { defineBasePlugins } from "../plugins";

import { Configuration, Resolve } from "webpack";
import webpack from "webpack";

// This will help with type checking in environment scripts, aka "downstream environments".
interface BaseConfig extends Configuration {
    module: webpack.Module;
    resolve: webpack.Resolve;
    plugins: webpack.Plugin[];
    output: webpack.Output;
}

// Allows imports without specifying file-endings and aliases to minify long relative imports.
const resolve: Resolve = defineResolves(rootPath);

// Export the baseline config for environment specific overrides or extensions.
const baseConfig: BaseConfig = {
    module: defineBaseRules(),
    resolve: resolve,
    plugins: defineBasePlugins(),
    output: defineOutput(rootPath, "base"),
    watchOptions: {
        ignored: ["less.d.ts", "node_modules/**"],
    },
};

// Webpack requires config exports to be defaulted.
export default baseConfig;
