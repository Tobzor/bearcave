import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    {
        languageOptions: {
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "ecmaVersion": 2020,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
            },
        }
    },
    {...eslintPluginPrettierRecommended,
        "rules": {
            "no-multi-spaces": [
                "warn"
            ],
            "jsx-a11y/accessible-emoji": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "prettier/prettier": "warn"
        },
    },
];