/** Overrides
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
 */

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        localStorage: true,
        fetch: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: { browser: true, node: true, es6: true },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off"
    },
    overrides: [
        {
            "files": ["*.ts", "*.tsx"],
            "rules": {
                "@typescript-eslint/explicit-function-return-type": ["warn"]
            }
        }
    ]
};
