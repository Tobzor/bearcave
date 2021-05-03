const { rootPath } = require("../root");
// Configuration definitions
const defineOutput = require("../output");
const defineResolves = require("../resolve");
const defineEntry = require("../entry");
const { defineBaseRules } = require("../rules");
const { defineBasePlugins } = require("../plugins");

// Export the baseline config for environment specific overrides or extensions.
const baseConfig = {
    entry: defineEntry(),
    module: {
        rules: defineBaseRules(),
    },
    // Allows imports without specifying file-endings and aliases to minify long relative imports.
    resolve: defineResolves(rootPath),
    plugins: defineBasePlugins(),
    output: defineOutput(),
    watchOptions: {
        ignored: ["css.d.ts", "node_modules/**"],
    },
};

// Webpack requires config exports to be defaulted.
module.exports = baseConfig;
