const { rootPath } = require("../root");
// Configuration definitions
const defineOutput = require("../output");
const defineResolves = require("../resolve");
const { defineBaseRules } = require("../rules");
const { defineBasePlugins } = require("../plugins");

// Allows imports without specifying file-endings and aliases to minify long relative imports.
const resolve = defineResolves(rootPath);

// Export the baseline config for environment specific overrides or extensions.
const baseConfig = {
    module: defineBaseRules(),
    resolve,
    plugins: defineBasePlugins(),
    output: defineOutput(rootPath, "base"),
    watchOptions: {
        ignored: ["css.d.ts", "node_modules/**"],
    },
};

// Webpack requires config exports to be defaulted.
module.exports = baseConfig;
