module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react", "react-hooks", "prettier"],
    extends: ["plugin:react/recommended"],
    settings: {
        react: {
            version: "detect",
        },
    },
    env: { browser: true, node: true, es6: true },
    rules: {
        "no-multi-spaces": ["warn"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": 0,
        "prettier/prettier": "warn",
        "react/react-in-jsx-scope": 0,
    },
};
