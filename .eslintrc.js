/** Overrides
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
 */

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@react", "@typescript-eslint", "prettier"],
  globals: {
    localStorage: true,
    fetch: true
  },
  env: { browser: true },
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: false
        },
        singleline: {
          delimiter: "comma",
          requireLast: false
        }
      }
    ],

    indent: "off",
    "@typescript-eslint/indent": ["warn", 4],

    semi: "off",
    "@typescript-eslint/semi": ["warn"],

    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": [
      "warn",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ],

    // allow "doublequoted" strings with support for `template literals`.
    quotes: "off",
    "@typescript-eslint/quotes": [
      "warn",
      "double",
      { allowTemplateLiterals: true }
    ]
  }
};
