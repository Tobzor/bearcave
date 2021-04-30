/** Overrides
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
 */

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: { browser: true, node: true, es6: true },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            excludedFiles: ["*.js", "*.jsx"],
            plugins: ["@typescript-eslint"],
            extends: [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                // "prettier/@typescript-eslint",
                "plugin:react/recommended",
            ],
            rules: {
                "react/jsx-uses-react": "off",
                "react/react-in-jsx-scope": "off",
            },
        },
    ],
};
