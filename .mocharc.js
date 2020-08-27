module.exports = {
    diff: true,
    recursive: true,
    watch: true,
    exclude: ["node_modules"],
    reporter: "spec",
    spec: ["src/**/*.spec.js"],
    slow: 25,
    fullTrace: true,
    timeout: 5000,
    ui: "bdd"
};
