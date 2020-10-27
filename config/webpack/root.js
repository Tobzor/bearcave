const { resolve, join, parse } = require("path");

// The absolute path to the root of project.
const rootPath = resolve(__dirname, "../../");

module.exports = { rootPath, join, parse };
