module.exports = {
    extends: [
        "eslint:recommended",
        "standard",
        "prettier",
        "prettier/standard",
        "plugin:node/recommended",
    ],
    plugins: [
        "prettier",
        "standard",
    ],
    parserOptions: {
        ecmaVersion: 6,
    },
    env: {
        node: true,
        mocha: true,
    },
    rules: {
        "space-before-function-paren": 0,
        "new-cap": 0,
        "prettier/prettier": 2,
        "camelcase": 0,
        "node/no-missing-require": ["error", {
            "resolvePaths": [__dirname],
        }]
    },
};
