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
                "plugin:react/recommended",
            ],
            rules: {
                "react/jsx-uses-react": "off",
                "react/react-in-jsx-scope": "off",
            },
        },
        {
            files: ["*.vue"],
            extends: [
                // add more generic rulesets here, such as:
                // 'eslint:recommended',
                "plugin:vue/vue3-recommended",
                // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
            ],
            rules: {
                "vue/html-indent": ["error", 4],
                "vue/max-attributes-per-line": [
                    "error",
                    {
                        singleline: {
                            max: 3,
                            allowFirstLine: true,
                        },
                        multiline: {
                            max: 1,
                            allowFirstLine: false,
                        },
                    },
                ],
                "vue/html-self-closing": 0,
                "vue/singleline-html-element-content-newline": 0,
            },
        },
    ],
};
